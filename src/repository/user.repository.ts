import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';

@Injectable()
@CustomRepository(User)
export class UserRepository extends Repository<User> {}
