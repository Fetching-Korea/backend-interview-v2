import { Test, TestingModule } from '@nestjs/testing';
import { ColorService } from './color.service';
import { Repository } from 'typeorm';
import { ColorEntity } from './entity/color.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateColorDto } from './dto/create-color.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockColorRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  softDelete: jest.fn(),
  save: jest.fn(),
});

describe('ColorService', () => {
  let sut: ColorService;
  let colorRepository: MockRepository<ColorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColorService,
        {
          provide: getRepositoryToken(ColorEntity),
          useValue: mockColorRepository(),
        },
      ],
    }).compile();

    sut = module.get<ColorService>(ColorService);
    colorRepository = module.get<MockRepository<ColorEntity>>(
      getRepositoryToken(ColorEntity),
    );
  });

  describe('색상 옵션 생성 기능', () => {
    it('이름과 code를 입력받고 생성에 성공한 경우', async () => {
      const givenDto: CreateColorDto = {
        name: 'black',
        code: '#FFFFFF',
      };
      await sut.create(givenDto);

      expect(colorRepository.save).toHaveBeenCalledWith({
        name: 'black',
        code: '#FFFFFF',
      });
    });
  });

  describe('색상 옵션 전체 조회 기능', () => {
    it('색상 옵션 전체 조회 성공한 경우', async () => {
      const givenColorList: ColorEntity[] = [
        {
          id: 1,
          name: 'test',
          code: '#000000',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          name: 'black',
          code: '#FFFFFF',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      colorRepository.find.mockResolvedValue(givenColorList);

      const result = await sut.findAll();

      expect(result.length).toEqual(2);
    });
  });

  describe('색상 옵션 삭제 기능', () => {
    it('색상 옵션 삭제에 성공한 경우', async () => {
      const givenId = 1;

      const result = await sut.remove(givenId);

      expect(result).toEqual('1 color removed');
      expect(colorRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });
});
