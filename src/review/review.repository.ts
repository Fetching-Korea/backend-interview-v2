import { CustomRepository } from 'src/typeorm-setting/typeorm-ex.decorator';
import { Review } from './review.entity';
import { Repository } from 'typeorm';

@CustomRepository(Review)
export class ReviewRepository extends Repository<Review> {}
