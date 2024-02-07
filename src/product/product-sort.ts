import { BadRequestException } from '@nestjs/common';

export const ProductSortType = [
  'price_ASC', // 저렴한 순
  'price_DESC', // 비싼 순
  'createdAt_ASC', // 최신 순
  'createdAt_DESC', // 오래된 순
  'reviewCount_DESC', // 리뷰 많은 순
];

export function productSortParsing(sortType: string): {
  sortColumn: string;
  ascOrDesc: 'ASC' | 'DESC';
} {
  if (!ProductSortType.includes(sortType)) {
    throw new BadRequestException('sort type is wrong');
  }
  const sortTypeToArray = sortType.split('_');
  const sortColumn = sortTypeToArray[0].replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`,
  );
  const ascOrDesc = sortTypeToArray[1] as 'ASC' | 'DESC';
  return { sortColumn, ascOrDesc };
}
