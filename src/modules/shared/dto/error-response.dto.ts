import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ErrorResponseDto {
  @ApiProperty({
    example: '401',
    description: 'Status code',
  })
  @IsNotEmpty()
  readonly statusCode: string;

  @ApiProperty({
    example: 'sampleerrormessage',
    description: 'Detail of error',
  })
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    example: '2002-03-13T00:00:00.000Z',
    description: 'Timestamp',
  })
  @IsNotEmpty()
  readonly timestamp: string;

  @ApiProperty({
    example: '/',
    description: 'Path where error occurred',
  })
  @IsNotEmpty()
  readonly path: string;
}
