import { FindOperator, FindOptionsWhere } from 'typeorm';
import {
    Equal,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
} from 'typeorm';

export const toOrder = (orders: string[]) => {
    const orderList = orders.map((v) => {
        const [column, direction] = v.split('__');
        return { [column]: direction };
    });
    const order = {};
    for (const target of orderList) {
        const [k, v] = Object.entries(target)[0];
        order[k.trim()] = v;
    }
    return order;
};

export const toWhere = <E>(dto: Record<string, any>): FindOptionsWhere<E> => {
    const whereList = Object.entries(dto).map(([key, value]) => {
        const [column, operator] = key.split('__');
        return makeWhere(column, operator, value);
    });
    const where = {};
    for (const target of whereList) {
        const [k, v] = Object.entries(target)[0];
        where[k] = v;
    }
    return where;
};

const makeWhere = <T>(
    column: string,
    operator: string,
    value: T,
): Record<string, FindOperator<T>> => {
    switch (operator) {
        case 'like':
            return { [column]: Like<T>(`${value}%` as T) };
        case 'gt':
            return { [column]: MoreThan<T>(value) };
        case 'gte':
            return { [column]: MoreThanOrEqual<T>(value) };
        case 'lt':
            return { [column]: LessThan<T>(value) };
        case 'lte':
            return { [column]: LessThanOrEqual<T>(value) };
        default:
            return { [column]: Equal<T>(value) };
    }
};
