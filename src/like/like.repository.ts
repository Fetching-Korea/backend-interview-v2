import { CustomRepository } from 'src/typeorm-setting/typeorm-ex.decorator';
import { Like } from './like.entity';
import { Repository } from 'typeorm';

@CustomRepository(Like)
export class LikeRepository extends Repository<Like> {}
