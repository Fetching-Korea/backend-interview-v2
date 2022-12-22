import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import { UseJwtAuthGuard } from '@src/auth/guard';
import { CurrentUser } from '@src/common/decorator/user.decorator';
import { MutationDto } from '@src/common/dto/mutation.dto';
import { User } from '@src/database/entity/user/user.entity';
import { CreateUserActivityDto } from '../dto/create-user-activity.dto';
import { DeleteUserActivityDto } from '../dto/delete-user-activity.dto';
import { GetStatsDto } from '../dto/get-stats.dto';
import { UserActivityService } from '../service/user-activity.service';

@Controller('user-activity')
export class UserActivityController {
    constructor(private readonly userActivityService: UserActivityService) {}

    @UseJwtAuthGuard()
    @Post()
    async create(
        @CurrentUser() user: User,
        @Body() dto: CreateUserActivityDto,
    ): Promise<MutationDto> {
        await this.userActivityService.create(user, dto);
        return { status: HttpStatus.CREATED };
    }

    @UseJwtAuthGuard()
    @Delete()
    async delete(
        @CurrentUser() user: User,
        @Body() dto: DeleteUserActivityDto,
    ): Promise<MutationDto> {
        await this.userActivityService.delete(user, dto);
        return { status: HttpStatus.OK };
    }

    @Get('stats')
    async getStats(@Query() dto: GetStatsDto) {
        return await this.userActivityService.getStats(dto);
    }
}
