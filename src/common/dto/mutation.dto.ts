import { HttpStatus } from '@nestjs/common';

export class MutationDto {
    status: HttpStatus;
    message?: string;
}
