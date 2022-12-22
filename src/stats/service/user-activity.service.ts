import { Inject, Injectable } from '@nestjs/common';
import { UserActivity } from '@src/database/entity/user/user-activity.entity';
import { User } from '@src/database/entity/user/user.entity';
import { RepositoryService } from '@src/database/service/repository.service';
import { DataSource } from 'typeorm';
import { CreateUserActivityDto } from '../dto/create-user-activity.dto';
import { DeleteUserActivityDto } from '../dto/delete-user-activity.dto';

@Injectable()
export class UserActivityService extends RepositoryService<UserActivity> {
    constructor(
        @Inject('DB_CONNECTION')
        private readonly db: DataSource,
    ) {
        super(db, UserActivity);
    }

    async create(
        user: User,
        { target, targetId, type }: CreateUserActivityDto,
    ) {
        user;
        const activity = await this.repository.findOneBy({
            type,
            targetId,
            userId: user.id!,
            target,
        });
        if (activity) return;
        await this.repository.insert({
            target,
            targetId,
            type,
            userId: user.id!,
        });
    }

    async delete(
        user: User,
        { target, targetId, type }: DeleteUserActivityDto,
    ) {
        const activity = await this.repository.findOneBy({
            type,
            targetId,
            userId: user.id!,
            target,
        });
        if (!activity) return;
        await this.repository.delete(activity.id!);
    }

    async getStats({ target, targetId, type }: CreateUserActivityDto) {
        const count = await this.repository.count({
            where: {
                type,
                targetId,
                target,
            },
        });
        return { count };
    }
}
