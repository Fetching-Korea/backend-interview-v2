import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserSignUpDto } from './user.dto';
import { PasswordBcryptEncrypt } from '../auth/password.bcrypt.encrypt';
import { ConflictException } from '@nestjs/common';

const mockPostRepository = () => ({
  save: jest.fn(),
  count: jest.fn(),
});

const mockPasswordEncrypt = {
  encrypt: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PostService', () => {
  let sut: UserService;
  let userRepository: MockRepository<UserEntity>;
  let passwordEncrypt;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockPostRepository(),
        },
        {
          provide: PasswordBcryptEncrypt,
          useValue: mockPasswordEncrypt,
        },
      ],
    }).compile();

    sut = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    passwordEncrypt = module.get<PasswordBcryptEncrypt>(PasswordBcryptEncrypt);
  });

  describe('회원 가입 테스트', () => {
    it('아이디, 비밀번호, 이메일을 입력받아 비밀번호 암호화와 회원가입에 성공한 경우', async () => {
      const givenDto: UserSignUpDto = {
        uId: 'testtest',
        password: 'testsets1234!',
        email: 'test@gmail.com',
      };
      userRepository.count.mockResolvedValue(0);
      passwordEncrypt.encrypt.mockResolvedValue('encryptString');

      const result = await sut.signUp(givenDto);

      expect(userRepository.save).toHaveBeenCalledWith({
        uId: 'testtest',
        password: 'encryptString',
        email: 'test@gmail.com',
      });
    });

    it('이미 중복된 아이디 혹은 이메일이 존재하여 회원가입에 실패한 경우', async () => {
      const givenDto: UserSignUpDto = {
        uId: 'testtest',
        password: 'testsets1234!',
        email: 'test@gmail.com',
      };
      userRepository.count.mockResolvedValue(1);
      passwordEncrypt.encrypt.mockResolvedValue('encryptString');

      await expect(async () => {
        await sut.signUp(givenDto);
      }).rejects.toThrowError(new ConflictException('Already exist user id '));
    });
  });
});
