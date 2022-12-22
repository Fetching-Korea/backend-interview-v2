import { Body, Controller, HttpStatus, Post, Put, Req } from '@nestjs/common';
import { UseJwtAuthGuard } from '@src/auth/guard';
import { CurrentUser } from '@src/common/decorator/user.decorator';
import { MutationDto } from '@src/common/dto/mutation.dto';
import { User } from '@src/database/entity/user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async signIn(@Body() dto: CreateUserDto): Promise<MutationDto> {
        await this.userService.create(dto);
        return {
            status: HttpStatus.CREATED,
        };
    }

    @UseJwtAuthGuard()
    @Put()
    async update(
        @CurrentUser() user: User,
        @Body() dto: UpdateUserDto,
    ): Promise<MutationDto> {
        await this.userService.update(user, dto);
        return {
            status: HttpStatus.OK,
        };
    }
}
