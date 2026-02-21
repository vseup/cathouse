import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Prisma } from '../generated/prisma/client';

const CAT_NAME_ALREADY_TAKEN_MESSAGE = 'Der Katzenname ist bereits vergeben.';

@Injectable()
export class CatService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCatDto: CreateCatDto) {
    const name = await this.assertCaseInsensitiveUniqueName(createCatDto.name);

    try {
      return await this.prisma.client.cat.create({
        data: {
          ...createCatDto,
          name,
        },
      });
    } catch (error) {
      this.throwOnUniqueViolation(error);
    }
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

  async getTotalDonations(): Promise<number> {
    const result = await this.prisma.client.cat.aggregate({
      _sum: {
        donation: true,
      },
    });

    return result._sum.donation ?? 0;
  }

  private async assertCaseInsensitiveUniqueName(
    name: string,
    excludeCatId?: string,
  ): Promise<string> {
    const normalizedName = name.trim();
    if (normalizedName.length === 0) {
      throw new BadRequestException('Der Katzenname darf nicht leer sein.');
    }

    const existingCat = await this.prisma.client.cat.findFirst({
      where: {
        name: {
          equals: normalizedName,
          mode: 'insensitive',
        },
        ...(excludeCatId != null ? { id: { not: excludeCatId } } : {}),
      },
      select: { id: true },
    });

    if (existingCat != null) {
      throw new ConflictException(CAT_NAME_ALREADY_TAKEN_MESSAGE);
    }

    return normalizedName;
  }

  private throwOnUniqueViolation(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(CAT_NAME_ALREADY_TAKEN_MESSAGE);
    }

    throw error;
  }
}
