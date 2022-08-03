import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLike } from './entities/userlike.entity';
import * as uuid from 'uuid';

@Injectable()
export class UserLikeService {
  constructor(
    @InjectRepository(UserLike)
    private userlikeRepository: Repository<UserLike>,
  ) {}

  async likeGoods(userId: string, goodsId: string) {
    const alreadyLike = await this.userlikeRepository.findOne({
      where: {
        user_id: userId,
        goods_id: goodsId,
      },
    });

    if (alreadyLike) {
      await this.userlikeRepository.delete({
        user_id: userId,
        goods_id: goodsId,
      });
    } else {
      const id = uuid.v4();
      const newLike = new UserLike();
      newLike.id = id;
      newLike.user_id = userId;
      newLike.goods_id = goodsId;
      await this.userlikeRepository.save(newLike);
    }
  }
}
