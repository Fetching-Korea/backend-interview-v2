import { PickType } from '@nestjs/swagger';
import { CreateUserActivityDto } from './create-user-activity.dto';

export class DeleteUserActivityDto extends PickType(CreateUserActivityDto, [
    'target',
    'targetId',
    'type',
] as const) {}
