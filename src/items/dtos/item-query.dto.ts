export type SortOrderType = '인기' | '최신순' | '높은 가격' | '낮은 가격';

export interface ItemQuery {
  q: string;
  page: number;
  pageSize: number;
  order: SortOrderType;
  category: string;
  subcategory: string;
}
