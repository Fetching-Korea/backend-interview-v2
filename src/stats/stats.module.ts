import { Module } from '@nestjs/common';
import { UserActivityController } from './controller/user-activity.controller';
import { UserActivityService } from './service/user-activity.service';

@Module({
    controllers: [UserActivityController],
    providers: [
        { provide: UserActivityService, useClass: UserActivityService },
    ],
})
export class StatsModule {}
