import { Test, TestingModule } from '@nestjs/testing';
import { SizeService } from './size.service';
import { Repository } from 'typeorm';
import { SizeEntity } from './entity/size.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSizeDto } from './dto/create-size.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockSizeRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  softDelete: jest.fn(),
  save: jest.fn(),
});

describe('SizeService', () => {
  let sut: SizeService;
  let sizeRepository: MockRepository<SizeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SizeService,
        {
          provide: getRepositoryToken(SizeEntity),
          useValue: mockSizeRepository(),
        },
      ],
    }).compile();

    sut = module.get<SizeService>(SizeService);
    sizeRepository = module.get<MockRepository<SizeEntity>>(
      getRepositoryToken(SizeEntity),
    );
  });

  describe('사이즈 옵션 생성 기능', () => {
    it('이름과 description 입력받고 생성에 성공한 경우', async () => {
      const givenDto: CreateSizeDto = {
        name: 'XL',
        description: '{"소매" : 53, "총장": 72}',
      };
      await sut.create(givenDto);

      expect(sizeRepository.save).toHaveBeenCalledWith({
        name: 'XL',
        description: '{"소매" : 53, "총장": 72}',
      });
    });
  });

  describe('사이즈 옵션 전체 조회 기능', () => {
    it('사이즈 옵션 전체 조회 성공한 경우', async () => {
      const givenSizeList: SizeEntity[] = [
        {
          id: 1,
          name: 'XL',
          description: '{"소매" : 53, "총장": 72}',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'L',
          description: '{"소매" : 50, "총장": 69}',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      sizeRepository.find.mockResolvedValue(givenSizeList);

      const result = await sut.findAll();

      expect(result.length).toEqual(2);
    });
  });

  describe('사이즈 옵션 삭제 기능', () => {
    it('사이즈 옵션 삭제에 성공한 경우', async () => {
      const givenId = 1;

      const result = await sut.remove(givenId);

      expect(result).toEqual('1 size removed');
      expect(sizeRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
