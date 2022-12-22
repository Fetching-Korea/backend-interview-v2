import { Inject, Injectable } from '@nestjs/common';
import { User, UserTier } from '@src/database/entity/user/user.entity';
import { RepositoryService } from '@src/database/service/repository.service';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService extends RepositoryService<User> {
    constructor(
        @Inject('DB_CONNECTION')
        private readonly db: DataSource,
    ) {
        super(db, User);
    }

    async create(dto: CreateUserDto): Promise<User> {
        const hashPassword = await bcrypt.hash(dto.password, 10);
        const user: User = {
            ...dto,
            password: hashPassword,
            tier: UserTier.NORMAL,
        };
        return await this.repository.save(user);
    }

    async update(
        user: User,
        dto: UpdateUserDto & { refreshToken?: string },
    ): Promise<boolean> {
        if (!Object.values(dto).length) return true;
        const payload = { ...dto };
        if (dto.password) {
            const hashPassword = await bcrypt.hash(dto.password, 10);
            payload['password'] = hashPassword;
        }
        await this.repository.update(user.id!, payload);
        return true;
    }

    async isExistEmail(email: string): Promise<boolean> {
        const exist = await this.repository.findOneBy({ email });
        return !!exist;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOneBy({ email });
        return user ?? undefined;
    }

    toFindUserDto(user: User): FindUserDto {
        const { password, refreshToken, ...publicUser } = user;
        return {
            ...publicUser,
            id: publicUser.id!,
            createdAt: publicUser.createdAt!,
            updatedAt: publicUser.updatedAt!,
        };
    }
}
