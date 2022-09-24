import { Item } from "src/items/items.entity";
import { User } from "src/users/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Review } from "./review.entity";

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review>{
    async createReview(createReviewDto, user: User, item : Item): Promise<{statusCode:string, contents:Review}> {
        const { rating, comment } = createReviewDto;

        const review = this.create({
            user : user,
            item : item,
            rating,
            comment
        })

        await this.save(review);
        return {statusCode:"200", contents:review};
    }
}