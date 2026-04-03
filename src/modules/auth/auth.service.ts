import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import argon2 from 'argon2';
import { PrismaService } from 'src/common/database/prisma.service';
import type { AuthLoginResponseDto, AuthRegisterResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}
    async register(email: string, password: string): Promise<AuthRegisterResponseDto> {
        const passwordHash = await argon2.hash(password)
        try {
        return await this.prisma.user.create({
            data: {
            email,
            passwordHash,
            },  
            select: {
                email: true,
                id: true,
                createdAt: true
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002"){
            throw new ConflictException('This email is already used');
            }
        }
        throw e
    }
    }

    async login(userEmail: string, password: string): Promise<AuthLoginResponseDto> {
        try {
        const user  = await this.prisma.user.findUnique({
            where: {
                email: userEmail,
            },
            select: {id: true, email: true, passwordHash: true}
        })

        if(!user) {
            throw new UnauthorizedException()
        }
        
        const {passwordHash, id, email} = user
        
        const ok = await argon2.verify(passwordHash, password)

        if(!ok) {
            throw new UnauthorizedException()
        }

        const payload = { sub: id, email }

        return {
            token: await this.jwtService.signAsync(payload)
        }

    } catch (e) {
        throw e
    }
    }
}
