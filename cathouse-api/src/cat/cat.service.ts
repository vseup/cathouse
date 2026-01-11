import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createCatDto: CreateCatDto) {
        return this.prisma.client.cat.create({
            data: createCatDto,
        });
    }

    async findAll() {
        return this.prisma.client.cat.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        const cat = await this.prisma.client.cat.findUnique({
            where: { id },
        });

        if (!cat) {
            throw new NotFoundException(`Cat with ID ${id} not found`);
        }

        return cat;
    }

    async update(id: string, updateCatDto: UpdateCatDto) {
        await this.findOne(id);

        return this.prisma.client.cat.update({
            where: { id },
            data: updateCatDto,
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.client.cat.delete({
            where: { id },
        });
    }

    async getTotalDonations(): Promise<number> {
        const result = await this.prisma.client.cat.aggregate({
            _sum: {
                donation: true,
            },
        });

        return result._sum.donation ?? 0;
    }
}
