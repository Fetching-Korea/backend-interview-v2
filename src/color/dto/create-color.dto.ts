import { IsNotEmpty, Matches } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(/#[a-fA-F0-9]{6}/)
  code: string;
}
