import { ApiProperty } from '@nestjs/swagger';
import { BusinessType } from 'src/items/enums/business-type.enums';

export type SortOrderType = '인기' | '최신순' | '높은 가격' | '낮은 가격';

export class ItemQuery {
  @ApiProperty({ required: false })
  q: string;
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  pageSize: number;
  @ApiProperty({ required: false })
  order: SortOrderType;
  @ApiProperty({ required: false })
  category: string;
  @ApiProperty({ required: false })
  subcategory: string;
  @ApiProperty({ required: false })
  businessType: BusinessType;
}
