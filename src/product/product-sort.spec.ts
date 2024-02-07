import { productSortParsing } from './product-sort';
import { BadRequestException } from '@nestjs/common';

describe('product sort test', () => {
  describe('productSortParsing test', () => {
    it('ProductSortType array에 존재하지 않는 값이 들어갓을 경우 에러', () => {
      expect(() => productSortParsing('test')).toThrowError(
        new BadRequestException('sort type is wrong'),
      );
    });

    it('price_ASC 입력 후 반환', () => {
      const result = productSortParsing('price_ASC');

      expect(result.sortColumn).toBe('price');
      expect(result.ascOrDesc).toBe('ASC');
    });

    it('createdAt_DESC 입력 후 camel to snake test', () => {
      const result = productSortParsing('createdAt_DESC');

      expect(result.sortColumn).toBe('created_at');
      expect(result.ascOrDesc).toBe('DESC');
    });
  });
});
