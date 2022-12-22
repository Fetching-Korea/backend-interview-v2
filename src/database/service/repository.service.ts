import { EntityManager, EntityTarget } from 'typeorm';
import { ObjectLiteral } from 'typeorm';
import { DataSource, Repository } from 'typeorm';

export abstract class RepositoryService<E extends ObjectLiteral> {
    protected repository: Repository<E>;
    constructor(
        private readonly dataSource: DataSource,
        private readonly target: EntityTarget<E>,
    ) {
        this.repository = dataSource.getRepository(target);
    }

    protected by(manager: EntityManager): Repository<E> {
        return manager.getRepository(this.target);
    }

    protected async transaction<T = any>(
        run: (manager: EntityManager) => Promise<T>,
    ): Promise<T> {
        const connection = this.repository.manager.connection;
        return await connection.transaction(run);
    }
}
