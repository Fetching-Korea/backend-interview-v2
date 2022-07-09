import { IsNumber, IsString, ValidateIf } from 'class-validator';
import { Order, Size } from '../entities/product.entity';

export class FilterProductDto {
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  readonly id: number | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly name: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly brand: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly size: Size | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly id_order: Order | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly name_order: Order | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly brand_order: Order | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly size_order: Order | null;
}
