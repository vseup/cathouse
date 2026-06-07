import { BadRequestException, ConflictException } from '@nestjs/common';
import { CatService } from './cat.service';
import { PrismaService } from '../prisma/prisma.service';
import { CatType } from '../generated/prisma/enums';

const mockCatRepo = {
  findFirst: jest.fn(),
  create: jest.fn(),
  aggregate: jest.fn(),
};

const mockPrisma = {
  client: { cat: mockCatRepo },
};

describe('CatService', () => {
  let service: CatService;

  beforeEach(() => {
    jest.resetAllMocks();
    service = new CatService(mockPrisma as unknown as PrismaService);
  });

  describe('create — name validation', () => {
    test('throws BadRequestException for whitespace-only name', async () => {
      await expect(
        service.create({ name: '   ', type: CatType.CAT01, donation: 10 }),
      ).rejects.toThrow(BadRequestException);
    });

    test('throws ConflictException when name is already taken (case-insensitive)', async () => {
      mockCatRepo.findFirst.mockResolvedValue({ id: 'existing-id' });

      await expect(
        service.create({ name: 'Whiskers', type: CatType.CAT01, donation: 10 }),
      ).rejects.toThrow(ConflictException);
    });

    test('trims name before persisting', async () => {
      mockCatRepo.findFirst.mockResolvedValue(null);
      mockCatRepo.create.mockResolvedValue({
        id: '1',
        name: 'Whiskers',
        type: CatType.CAT01,
        donation: 10,
      });

      await service.create({
        name: '  Whiskers  ',
        type: CatType.CAT01,
        donation: 10,
      });

      expect(mockCatRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: expect.objectContaining({ name: 'Whiskers' }),
        }),
      );
    });
  });

  describe('getTotalDonations', () => {
    test('returns aggregated donation sum', async () => {
      mockCatRepo.aggregate.mockResolvedValue({ _sum: { donation: 150 } });

      expect(await service.getTotalDonations()).toBe(150);
    });

    test('returns 0 when no cats exist yet', async () => {
      mockCatRepo.aggregate.mockResolvedValue({ _sum: { donation: null } });

      expect(await service.getTotalDonations()).toBe(0);
    });
  });
});
