import { IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    readonly password?: string;
}
