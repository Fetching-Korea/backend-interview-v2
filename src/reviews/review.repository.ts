import { EntityRepository, Repository } from "typeorm";
import { Review } from "./review.entity";

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review>{
    async createReview(createReviewDto): Promise<Review> {
        const { itemId, userId, rating, comment } = createReviewDto;

        const review = this.create({
            rating,
            comment
        })

        await this.save(review);
        return review;
    }
}