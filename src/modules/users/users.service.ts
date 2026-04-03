import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import type { UserId } from 'src/common/types/ids';

export type UserProfileResult = {
  email: string;
  displayName: string | null;
};

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getUser(userId: UserId): Promise<UserProfileResult> {
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
