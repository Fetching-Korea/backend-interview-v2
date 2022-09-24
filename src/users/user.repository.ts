import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto): Promise<User> {
        const { name, email, password } = createUserDto;

        const user = this.create({
            name,
            email,
            password
        })

        await this.save(user);
        return user;
    }
}