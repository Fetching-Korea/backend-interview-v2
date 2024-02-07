import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSignUpDto } from './dto/user.dto';
import { PasswordBcryptEncrypt } from '../auth/password.bcrypt.encrypt';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const mockUserRepository = () => ({
  save: jest.fn(),
  count: jest.fn(),
  findOne: jest.fn(),
});

const mockPasswordEncrypt = {
  encrypt: jest.fn(),
  compare: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('User Service Test', () => {
  let sut: UserService;
  let userRepository: MockRepository<UserEntity>;
  let passwordEncrypt;
  let jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository(),
        },
        {
          provide: PasswordBcryptEncrypt,
          useValue: mockPasswordEncrypt,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    sut = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    passwordEncrypt = module.get<PasswordBcryptEncrypt>(PasswordBcryptEncrypt);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('회원 가입 테스트', () => {
    it('아이디, 비밀번호, 이메일을 입력받아 비밀번호 암호화와 회원가입에 성공한 경우', async () => {
      const givenDto: UserSignUpDto = {
        uId: 'testtest',
        password: 'testsets1234!',
        email: 'test@gmail.com',
        name: 'tees',
      };
      userRepository.count.mockResolvedValue(0);
      passwordEncrypt.encrypt.mockResolvedValue('encryptString');

      await sut.signUp(givenDto);

      expect(userRepository.save).toHaveBeenCalledWith({
        uId: 'testtest',
        password: 'encryptString',
        email: 'test@gmail.com',
        name: 'tees',
      });
    });

    it('이미 중복된 아이디 혹은 이메일이 존재하여 회원가입에 실패한 경우', async () => {
      const givenDto: UserSignUpDto = {
        uId: 'testtest',
        password: 'testsets1234!',
        email: 'test@gmail.com',
        name: 'tees',
      };
      userRepository.count.mockResolvedValue(1);
      passwordEncrypt.encrypt.mockResolvedValue('encryptString');

      await expect(async () => {
        await sut.signUp(givenDto);
      }).rejects.toThrowError(new ConflictException('Already exist user id '));
    });
  });

  describe('로그인 테스트', () => {
    it('아이디 패스워드를 입력받아 로그인에 성공한 경우', async () => {
      const givenDto = {
        uId: 'testtest',
        password: 'test',
      };

      const givenUser = {
        id: 1,
        uId: 'testtest',
        password: 'tatsfzxvqwtqwrq',
        email: 'test2@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      userRepository.findOne.mockResolvedValue(givenUser);
      passwordEncrypt.compare.mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValue('success');

      const result = await sut.login(givenDto);

      expect(result.accessToken).toEqual('success');
    });
    it('입력받은 아이디의 user가 존재하지 않는 경우', async () => {
      const givenDto = {
        uId: 'testtest',
        password: 'test',
      };
      userRepository.findOne.mockResolvedValue(null);

      await expect(async () => {
        await sut.login(givenDto);
      }).rejects.toThrowError(new NotFoundException('user not exist'));
    });
    it('비밀번호가 일치하지 않는 경우', async () => {
      const givenDto = {
        uId: 'testtest',
        password: 'test',
      };

      const givenUser = {
        id: 1,
        uId: 'testtest',
        password: 'tatsfzxvqwtqwrq',
        email: 'test2@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      userRepository.findOne.mockResolvedValue(givenUser);
      passwordEncrypt.compare.mockResolvedValue(false);

      await expect(async () => {
        await sut.login(givenDto);
      }).rejects.toThrowError(new ForbiddenException('password not match'));
    });
  });
});
