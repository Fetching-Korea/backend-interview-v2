import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshReqDto {
  @ApiProperty({
    example:
      'fbjQmJKujT7wEk0ljJrgPeebcvFsD46eMZyH2HWdXGBuMKNAUuiGTMZMBWRrHScIHLafira2aM6Bi7ID8MSUdlK420mvLtsqKdquA4ACnToW2ZnPtq73vPIORZOXjiGUBysdnSIDxWWGD1PMITunHbtvfdTsnhBtuhuENlWbNwA2YzgLzAUsjujtb9nyI6VNn0sXjdXP7P2SGfgUPkNHQbTCS16nSuJi7O3Iglbu4OxHZSzfKOkHQ7woc6PWoCD',
    description: 'refreshToken',
  })
  @IsNotEmpty()
  readonly refreshToken: string;
}
