import { Test, TestingModule } from '@nestjs/testing';
import { GoodsService } from './goods.service';
import { ProductEntity } from '../product/entity/product.entity';
import { Repository } from 'typeorm';
import { GoodsEntity } from './entity/goods.entity';
import { ColorEntity } from '../color/entity/color.entity';
import { SizeEntity } from '../size/entity/size.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGoodDto } from './dto/create-good.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockGoodsRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  softDelete: jest.fn(),
  save: jest.fn(),
});

const mockProductRepository = () => ({
  findOne: jest.fn(),
});

const mockColorRepository = () => ({
  findOne: jest.fn(),
});

const mockSizeRepository = () => ({
  findOne: jest.fn(),
});

describe('GoodsService', () => {
  let sut: GoodsService;
  let goodsRepository: MockRepository<GoodsEntity>;
  let productRepository: MockRepository<ProductEntity>;
  let colorRepository: MockRepository<ColorEntity>;
  let sizeRepository: MockRepository<SizeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoodsService,
        {
          provide: getRepositoryToken(GoodsEntity),
          useValue: mockGoodsRepository(),
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductRepository(),
        },
        {
          provide: getRepositoryToken(ColorEntity),
          useValue: mockColorRepository(),
        },
        {
          provide: getRepositoryToken(SizeEntity),
          useValue: mockSizeRepository(),
        },
      ],
    }).compile();

    sut = module.get<GoodsService>(GoodsService);
    goodsRepository = module.get<MockRepository<GoodsEntity>>(
      getRepositoryToken(GoodsEntity),
    );
    productRepository = module.get<MockRepository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
    colorRepository = module.get<MockRepository<ColorEntity>>(
      getRepositoryToken(ColorEntity),
    );
    sizeRepository = module.get<MockRepository<SizeEntity>>(
      getRepositoryToken(SizeEntity),
    );
  });

  describe('전체 판매 물품 조회 기능', () => {
    it('해당 productId의 물품 조회가 성공한 경우 ', async () => {
      const givenProduct = [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          id: 1,
          sizeId: 1,
          colorId: 1,
          productId: 1,
          color: {
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            id: 1,
            name: 'test',
            code: '#FFFFFF',
          },
          size: {
            createdAt: new Date('2024-02-07T13:18:16.207Z'),
            updatedAt: new Date(),
            deletedAt: null,
            id: 1,
            name: 'test',
            description: '{}',
          },
        },
      ];
      goodsRepository.find.mockResolvedValue(givenProduct);
      const result = await sut.findAllByProductId(1);

      expect(result.length).toEqual(1);
    });
  });

  describe('판매 물품 생성 기능', () => {
    function createGivenColor(id: number): ColorEntity {
      return {
        code: '',
        createdAt: undefined,
        deletedAt: undefined,
        id: id,
        name: '',
        updatedAt: undefined,
      };
    }

    function createGivenSize(id: number): SizeEntity {
      return {
        description: '',
        createdAt: undefined,
        deletedAt: undefined,
        id: id,
        name: '',
        updatedAt: undefined,
      };
    }

    function createGivenProduct(id: number): ProductEntity {
      return {
        brandName: '',
        description: '',
        goods: [],
        mainImage: '',
        price: 0,
        reviewCount: 0,
        reviews: [],
        createdAt: undefined,
        deletedAt: undefined,
        id: id,
        name: '',
        updatedAt: undefined,
      };
    }

    it('sizeId, colorId, productId를 입력받아 생성에 성공한 경우', async () => {
      const givenDto: CreateGoodDto = {
        colorId: 1,
        productId: 1,
        sizeId: 1,
      };
      const givenSize = createGivenSize(1);
      const givenProduct = createGivenProduct(1);
      const givenColor = createGivenColor(1);

      sizeRepository.findOne.mockResolvedValue(givenSize);
      productRepository.findOne.mockResolvedValue(givenProduct);
      colorRepository.findOne.mockResolvedValue(givenColor);

      await sut.create(givenDto);

      expect(goodsRepository.save).toHaveBeenCalledWith({
        sizeId: 1,
        colorId: 1,
        productId: 1,
      });
    });

    it('sizeId 해당하는 데이터가 없는 경우', async () => {
      const givenDto: CreateGoodDto = {
        colorId: 1,
        productId: 1,
        sizeId: 1,
      };
      const givenProduct = createGivenProduct(1);
      const givenColor = createGivenColor(1);

      sizeRepository.findOne.mockResolvedValue(null);
      productRepository.findOne.mockResolvedValue(givenProduct);
      colorRepository.findOne.mockResolvedValue(givenColor);

      await expect(async () => {
        await sut.create(givenDto);
      }).rejects.toThrowError(new Error('size is not exist'));
    });

    it('colorId 해당하는 데이터가 없는 경우', async () => {
      const givenDto: CreateGoodDto = {
        colorId: 1,
        productId: 1,
        sizeId: 1,
      };
      const givenSize = createGivenSize(1);
      const givenProduct = createGivenProduct(1);

      sizeRepository.findOne.mockResolvedValue(givenSize);
      productRepository.findOne.mockResolvedValue(givenProduct);
      colorRepository.findOne.mockResolvedValue(null);

      await expect(async () => {
        await sut.create(givenDto);
      }).rejects.toThrowError(new Error('color is not exist'));
    });

    it('productId 해당하는 데이터가 없는 경우', async () => {
      const givenDto: CreateGoodDto = {
        colorId: 1,
        productId: 1,
        sizeId: 1,
      };
      const givenSize = createGivenSize(1);
      const givenColor = createGivenColor(1);

      sizeRepository.findOne.mockResolvedValue(givenSize);
      productRepository.findOne.mockResolvedValue(null);
      colorRepository.findOne.mockResolvedValue(givenColor);

      await expect(async () => {
        await sut.create(givenDto);
      }).rejects.toThrowError(new Error('product is not exist'));
    });
  });

  describe('판매 물품 삭제 기능', () => {
    it('판매 물품 삭제에 성공한 경우', async () => {
      const givenId = 1;

      const result = await sut.remove(givenId);

      expect(result).toEqual('1 goods removed');
      expect(goodsRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
