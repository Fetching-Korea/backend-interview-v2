import { IsNumberString, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumberString()
  uid: number;

  @IsNumberString()
  pid: number;

  @IsString()
  comment: string;
}
