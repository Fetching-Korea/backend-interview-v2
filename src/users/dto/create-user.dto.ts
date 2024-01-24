import { Grade } from "../entities/user.entity";

export class CreateUserDto {
    grade: Grade;
    email: string;
    nickName: string;
    name: string;
    birthDate: string;
    number: string;
    password: string;
}
