import {
    UserActivityTarget,
    UserActivityType,
} from '@src/database/entity/user/user-activity.entity';
import { IsEnum } from 'class-validator';

export class CreateUserActivityDto {
    @IsEnum(UserActivityTarget)
    readonly target: UserActivityTarget;
    readonly targetId: string;
    @IsEnum(UserActivityType)
    readonly type: UserActivityType;
}
