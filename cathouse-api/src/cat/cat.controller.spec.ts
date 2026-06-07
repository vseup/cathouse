import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatType } from '../generated/prisma/enums';

const mockCat = {
  id: 'abc-123',
  name: 'Whiskers',
  type: CatType.CAT01,
  donation: 10,
  donor: 'Alice',
  createdAt: new Date(),
};

const mockCat2 = {
  id: 'def-456',
  name: 'Pawy',
  type: CatType.CAT02,
  donation: 20,
  donor: 'Bob',
  createdAt: new Date(),
};

const mockCatService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  getTotalDonations: jest.fn(),
};

describe('CatController', () => {
  let controller: CatController;

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [{ provide: CatService, useValue: mockCatService }],
    }).compile();

    controller = module.get<CatController>(CatController);
  });

  describe('create', () => {
    test('delegates to service and returns created cat', async () => {
      mockCatService.create.mockResolvedValue(mockCat);
      const dto = {
        name: 'Whiskers',
        type: CatType.CAT01,
        donation: 10,
        donor: 'Alice',
      };

      const result = await controller.create(dto);

      expect(mockCatService.create).toHaveBeenCalledWith(dto);
      expect(result).toBe(mockCat);
    });
  });

  describe('findAll', () => {
    test('returns all cats from service', async () => {
      const cats = [mockCat, mockCat2];
      mockCatService.findAll.mockResolvedValue(cats);

      const result = await controller.findAll();

      expect(mockCatService.findAll).toHaveBeenCalled();
      expect(result).toBe(cats);
    });
  });

  describe('findOne', () => {
    test('passes id to service and returns the cat', async () => {
      mockCatService.findOne.mockResolvedValue(mockCat);

      const result = await controller.findOne('abc-123');

      expect(mockCatService.findOne).toHaveBeenCalledWith('abc-123');
      expect(result).toBe(mockCat);
    });
  });

  describe('getTotalDonations', () => {
    test('wraps service result in totalDonations object', async () => {
      mockCatService.getTotalDonations.mockResolvedValue(250);

      const result = await controller.getTotalDonations();

      expect(mockCatService.getTotalDonations).toHaveBeenCalled();
      expect(result).toEqual({ totalDonations: 250 });
    });

    test('wraps zero correctly when no donations exist', async () => {
      mockCatService.getTotalDonations.mockResolvedValue(0);

      const result = await controller.getTotalDonations();

      expect(result).toEqual({ totalDonations: 0 });
    });
  });
});
