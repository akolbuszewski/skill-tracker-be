import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getUser(userId: User['id']){
        const data = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                email: true,
                displayName: true,
            }
            
        })

        if(!data) {
            throw new NotFoundException()
        }
        return data
    }
}
