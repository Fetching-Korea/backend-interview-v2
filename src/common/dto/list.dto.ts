import { EdgeDto } from './pagination.dto';

export class ListDto<E> {
    items: E[];
    edge: EdgeDto;
}
