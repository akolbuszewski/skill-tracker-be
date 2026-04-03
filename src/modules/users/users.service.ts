import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import type { UserId } from 'src/common/types/ids';
import type { UserProfileResponseDto } from './dto/user-profile-response.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getUser(userId: UserId): Promise<UserProfileResponseDto> {
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
