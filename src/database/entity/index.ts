import { Company } from './company/company.entity';
import { Commodity } from './goods/commodity.entity';
import { Goods } from './goods/goods.entity';
import { Post } from './post/post.entity';
import { UserActivity } from './user/user-activity.entity';
import { User } from './user/user.entity';

export const entities = [User, Goods, Company, Commodity, UserActivity, Post];
