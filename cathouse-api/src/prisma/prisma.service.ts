import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { prisma } from '../../prisma/prisma';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    get client() {
        return prisma;
    }

    async onModuleInit() {
        await prisma.$connect();
    }

    async onModuleDestroy() {
        await prisma.$disconnect();
    }
}
