import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/users/user.entity';
import { Review } from 'src/review/review.entity';

@Injectable()
export class MypageService {
  constructor(private userRepository: UserRepository) {}

  async getMyReviews(user: User): Promise<Review[]> {
    const userInfo = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['reviews'],
    });
    return userInfo.reviews;
  }
}
