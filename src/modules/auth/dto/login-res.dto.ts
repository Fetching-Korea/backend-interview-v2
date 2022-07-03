import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../../user/user.entity';

export class LoginResDto {
  @ApiProperty({
    example: UserEntity,
    description: 'user entity',
  })
  @IsNotEmpty()
  readonly user: UserEntity;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImFkbSI6dHJ1ZSwiaWF0IjoxNjU2NTc2OTg3LCJleHAiOjE2NTY1ODc3ODcsImlzcyI6IiJ9.Dv9jkJlKqZsR6prEAN3irigQtyp9VvwzTBHu3Av50H8',
    description: 'access token',
  })
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({
    example:
      'fbjQmJKujT7wEk0ljJrgPeebcvFsD46eMZyH2HWdXGBuMKNAUuiGTMZMBWRrHScIHLafira2aM6Bi7ID8MSUdlK420mvLtsqKdquA4ACnToW2ZnPtq73vPIORZOXjiGUBysdnSIDxWWGD1PMITunHbtvfdTsnhBtuhuENlWbNwA2YzgLzAUsjujtb9nyI6VNn0sXjdXP7P2SGfgUPkNHQbTCS16nSuJi7O3Iglbu4OxHZSzfKOkHQ7woc6PWoCD',
    description: 'refreshToken',
  })
  @IsNotEmpty()
  readonly refreshToken: string;
}
