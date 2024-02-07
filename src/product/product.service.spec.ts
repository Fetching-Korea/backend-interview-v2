import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

const mockProductRepository = () => ({
  save: jest.fn(),
  count: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    getMany: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
  }),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ProductService', () => {
  let sut: ProductService;
  let productRepository: MockRepository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductRepository(),
        },
      ],
    }).compile();

    sut = module.get<ProductService>(ProductService);
    productRepository = module.get<MockRepository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  describe('물품 생성 기능', () => {
    it('물품 생성에 성공한 경우', async () => {
      const givenDto: ProductCreateDto = {
        name: 'test',
        description: 'test',
        brandName: 'test',
        price: 100000,
        mainImage: 'testImage',
      };

      const result = await sut.create(givenDto);

      expect(result).toBeTruthy();
      expect(productRepository.save).toHaveBeenCalledWith({
        name: 'test',
        description: 'test',
        brandName: 'test',
        price: 100000,
        mainImage: 'testImage',
      });
    });
  });

  describe('물품 업데이트 기능', () => {
    it('물품 업데이트에 성공한 경우', async () => {
      const givenDto: ProductUpdateDto = {
        id: 1,
        name: 'testChange',
        description: 'testChange',
        brandName: 'testChange',
        price: 200000,
        mainImage: 'testImageChange',
      };

      const givenProduct = {
        id: 1,
        name: 'test',
        description: 'test',
        brandName: 'test',
        price: 100000,
        mainImage: 'testImage',
      };
      productRepository.findOne.mockResolvedValue(givenProduct);

      const result = await sut.update(givenDto);

      expect(result).toBeTruthy();
      expect(productRepository.save).toHaveBeenCalledWith({
        id: 1,
        name: 'testChange',
        description: 'testChange',
        brandName: 'testChange',
        price: 200000,
        mainImage: 'testImageChange',
      });
    });

    it('해당 ID 물품이 존재하지 않아 저장에 실패한 경우', async () => {
      const givenDto: ProductUpdateDto = {
        id: 1,
        name: 'testChange',
        description: 'testChange',
        brandName: 'testChange',
        price: 200000,
        mainImage: 'testImageChange',
      };
      productRepository.findOne.mockResolvedValue(null);

      await expect(async () => {
        await sut.update(givenDto);
      }).rejects.toThrowError(new NotFoundException('product is not exist'));
    });
  });

  describe('물품 삭제 기능', () => {
    it('물품 삭제에 성공한 경우', async () => {
      const givenId = 1;

      const result = await sut.remove(givenId);

      expect(result).toEqual('1 product removed');
      expect(productRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });

  describe('물품 전체 조회 기능', () => {
    it('물품 전체 조회에 성공한 경우', async () => {
      const result = await sut.findAll(1, 10, 'createdAt_ASC', 0, -1);

      expect(result.currentPage).toEqual(1);
      expect(productRepository.createQueryBuilder().skip).toHaveBeenCalled();
      expect(productRepository.createQueryBuilder().take).toHaveBeenCalled();
      expect(
        productRepository.createQueryBuilder().orderBy,
      ).toHaveBeenCalledWith(`product.created_at`, `ASC`);
      expect(
        productRepository.createQueryBuilder().andWhere,
      ).toHaveBeenCalledTimes(0);
    });

    it('minPrice, maxPrice, name, brandName 조회에 성공한 경우', async () => {
      const result = await sut.findAll(
        1,
        10,
        'reviewCount_DESC',
        1000,
        100000,
        'test',
        'testBrand',
      );

      expect(result.currentPage).toEqual(1);
      expect(productRepository.createQueryBuilder().skip).toHaveBeenCalled();
      expect(productRepository.createQueryBuilder().take).toHaveBeenCalled();
      expect(
        productRepository.createQueryBuilder().orderBy,
      ).toHaveBeenCalledWith(`product.review_count`, `DESC`);
      expect(
        productRepository.createQueryBuilder().andWhere,
      ).toHaveBeenCalledTimes(4);
    });
  });

  describe('하나의 물품 조회 기능', () => {
    it('물품 조회가 성공한 경우', async () => {
      const givenProduct: ProductEntity = {
        brandName: '',
        createdAt: new Date(),
        deletedAt: undefined,
        description: '',
        goods: [],
        id: 1,
        mainImage: '',
        name: '',
        price: 0,
        reviewCount: 0,
        reviews: [],
        updatedAt: new Date(),
      };
      productRepository.findOne.mockResolvedValue(givenProduct);

      const result = await sut.findOne(1);

      expect(result.id).toEqual(1);
    });
  });
});
