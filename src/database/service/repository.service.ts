import { ListDto } from '@src/common/dto/list.dto';
import { EdgeDto } from '@src/common/dto/pagination.dto';
import {
    EntityManager,
    EntityTarget,
    FindOptionsRelations,
    FindOptionsWhere,
} from 'typeorm';
import { ObjectLiteral } from 'typeorm';
import { DataSource, Repository } from 'typeorm';
import { toOrder, toWhere } from '../util/query-builder';

export abstract class RepositoryService<E extends ObjectLiteral> {
    protected repository: Repository<E>;
    constructor(
        private readonly dataSource: DataSource,
        private readonly target: EntityTarget<E>,
    ) {
        this.repository = dataSource.getRepository(target);
    }

    async findBy(
        findDto: Record<string, any>,
        relations?: FindOptionsRelations<E>,
    ): Promise<ListDto<E>> {
        const { count, page, order: orderDto, ...dto } = findDto;
        const order = toOrder(orderDto);
        const skip = (page - 1) * count;
        const where = toWhere<E>(dto);
        const items = await this.repository.find({
            where,
            take: count,
            skip,
            order,
            relations,
        });
        const edge = await this.getEdge(where, { count, page });
        return { items, edge };
    }

    private async getEdge(
        where: FindOptionsWhere<E>,
        pageDto: { count: number; page: number },
    ): Promise<EdgeDto> {
        const totalCount = !!Object.values(where).length
            ? await this.repository.count({ where })
            : await this.repository.count();
        const pageCount = Math.ceil(totalCount / pageDto.count);
        const page = pageDto.page;

        const edge: EdgeDto = {
            hasNextPage: Number(page) < Number(pageCount),
            hasPreviousPage:
                Number(page) === 1 || Number(page) > Number(pageCount)
                    ? false
                    : true,
            currentPage:
                Number(pageCount) > Number(page)
                    ? Number(page)
                    : Number(pageCount),
            pageCount: Number(pageCount),
            totalCount: Number(totalCount),
        };
        return edge;
    }
}
