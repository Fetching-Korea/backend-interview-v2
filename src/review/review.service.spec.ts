import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entity/review.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '../product/entity/product.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewWriteRepository } from './review-write.repository';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockProductRepository = () => ({
  save: jest.fn(),
  count: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

const mockReviewRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
  find: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  }),
});

const mockReviewWriteRepository = {
  saveAndUpdateCount: jest.fn(),
  removeAndUpdateCount: jest.fn(),
};

describe('ReviewService', () => {
  let sut: ReviewService;
  let reviewRepository: MockRepository<ReviewEntity>;
  let reviewWriteRepository;
  let productRepository: MockRepository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(ReviewEntity),
          useValue: mockReviewRepository(),
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductRepository(),
        },
        {
          provide: ReviewWriteRepository,
          useValue: mockReviewWriteRepository,
        },
      ],
    }).compile();

    sut = module.get<ReviewService>(ReviewService);
    productRepository = module.get<MockRepository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
    reviewRepository = module.get<MockRepository<ReviewEntity>>(
      getRepositoryToken(ReviewEntity),
    );
    reviewWriteRepository = module.get<ReviewWriteRepository>(
      ReviewWriteRepository,
    );
  });

  function givenProduct(): ProductEntity {
    return {
      id: 1,
      brandName: 'brand',
      createdAt: new Date(),
      deletedAt: undefined,
      description: '설명',
      goods: [],
      mainImage: 'main',
      name: 'name',
      price: 0,
      reviewCount: 0,
      reviews: [],
      updatedAt: new Date(),
    };
  }

  function givenReview(
    id: number,
    userId: number,
    productId: number,
  ): ReviewEntity {
    return {
      id: id,
      userId: userId,
      productId: productId,
      content: '',
      user: undefined,
      product: undefined,
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }

  describe('리뷰 생성 기능', () => {
    it('productId, userId, 점수, 리뷰 내용을 입력받고 리뷰 생성에 성공한 경우', async () => {
      const givenDto: CreateReviewDto = {
        content: '리뷰 내용',
        productId: 1,
        score: 10,
        userId: 1,
      };
      const product = givenProduct();
      productRepository.findOne.mockResolvedValue(product);

      await sut.create(givenDto, 1);

      expect(reviewWriteRepository.saveAndUpdateCount).toHaveBeenCalledWith(
        {
          content: '리뷰 내용',
          productId: 1,
          score: 10,
          userId: 1,
        },
        product,
      );
    });

    it('CreateReviewDto 의 productId가 DB상에 존재하지 않는 데이터일 경우 에러', async () => {
      const givenDto: CreateReviewDto = {
        content: '리뷰 내용',
        productId: 1,
        score: 10,
        userId: 1,
      };
      productRepository.findOne.mockResolvedValue(null);

      await expect(async () => {
        await sut.create(givenDto, 1);
      }).rejects.toThrowError(new NotFoundException('product is not exist'));
    });

    it('CreateReviewDto 의 userId와 로그인 userId가 다를 경우 에러', async () => {
      const givenDto: CreateReviewDto = {
        content: '리뷰 내용',
        productId: 1,
        score: 10,
        userId: 1,
      };
      productRepository.findOne.mockResolvedValue(givenProduct());

      await expect(async () => {
        await sut.create(givenDto, 2);
      }).rejects.toThrowError(new ForbiddenException('user different'));
    });
  });

  describe('리뷰 업데이트 기능', () => {
    it('id, 점수, 리뷰 내용을 입력받고 리뷰 업데이트에 성공한 경우', async () => {
      const givenDto: UpdateReviewDto = {
        id: 1,
        content: '리뷰 업데이트 내용',
        score: 9,
      };

      productRepository.findOne.mockResolvedValue(givenProduct());
      reviewRepository.findOne.mockResolvedValue(givenReview(1, 1, 1));

      await sut.update(givenDto, 1);

      expect(reviewRepository.save).toHaveBeenCalledTimes(1);
    });

    it('UpdateReviewDto 의 userId와 로그인 userId가 다를 경우 에러', async () => {
      const givenDto: UpdateReviewDto = {
        id: 1,
        content: '리뷰 업데이트 내용',
        score: 9,
      };
      productRepository.findOne.mockResolvedValue(givenProduct());
      reviewRepository.findOne.mockResolvedValue(givenReview(1, 1, 1));

      await expect(async () => {
        await sut.update(givenDto, 2);
      }).rejects.toThrowError(new ForbiddenException('user different'));
    });
  });

  describe('리뷰 삭제 기능', () => {
    it('id, loginUserId를 입력받아 삭제에 성공한 경우', async () => {
      const review = givenReview(1, 1, 1);
      const product = givenProduct();
      reviewRepository.findOne.mockResolvedValue(review);
      productRepository.findOne.mockResolvedValue(product);

      const result = await sut.remove(1, 1);

      expect(result).toEqual('1 review remove');
      expect(reviewWriteRepository.removeAndUpdateCount).toHaveBeenCalledWith(
        review,
        product,
      );
    });

    it('review record 상의 userId, loginUserId를 달라서 에러가 발생한 경우', async () => {
      reviewRepository.findOne.mockResolvedValue(givenReview(1, 1, 1));

      await expect(async () => {
        await sut.remove(1, 2);
      }).rejects.toThrowError(new ForbiddenException('user different'));
    });
  });

  describe('물품 id를 통한 리뷰 전체 조회', () => {
    it('productId를 입력받아 리뷰를 성공적으로 조회한 경우', async () => {
      const givenReviewList: ReviewEntity[] = [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          id: 6,
          productId: 1,
          userId: 1,
          score: 1,
          content: '좋아용',
          user: {
            id: 2,
            uId: 'testest',
            password: 'teatataeat',
            email: 'test@meidalf.com',
            name: 'testName',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
          product: undefined,
        },
      ];
      reviewRepository
        .createQueryBuilder()
        .getMany.mockResolvedValue(givenReviewList);

      const result = await sut.findAllByProductId(1, 1, 30);

      expect(result.reviewList.length).toEqual(1);
      expect(result.reviewList[0].user).toBeDefined();
      expect(result.reviewList[0].user.name).toEqual('testName');
    });
  });

  describe('유저 id를 통한 리뷰 전체 조회', () => {
    it('userId를 입력받아 리뷰를 성공적으로 조회한 경우', async () => {
      const givenReviewList: ReviewEntity[] = [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          id: 6,
          productId: 1,
          userId: 1,
          score: 1,
          content: '좋아용',
          user: undefined,
          product: {
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            id: 1,
            name: '1',
            description: '1',
            brandName: '1',
            price: 1,
            mainImage: '1',
            reviewCount: 1,
            goods: undefined,
            reviews: undefined,
          },
        },
      ];
      reviewRepository.find.mockResolvedValue(givenReviewList);

      const result = await sut.findAllByUserId(1, 1, 30);

      expect(result.reviewList.length).toEqual(1);
      expect(result.reviewList[0].product).toBeDefined();
    });
  });
});
