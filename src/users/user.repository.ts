import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from '../auth/dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { customId, name, email, password } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            customId,
            name,
            email,
            password : hashedPassword
        })
        try{
            await this.save(user);
            return 'user created';
        }
        catch(error){
            if(error.code === '23505'){
                throw new ConflictException('User already exists');
            }
            else{
                console.log(error);
                throw new InternalServerErrorException();
            }
        }
    }
}