import { ApiProperty } from '@nestjs/swagger';
import { BusinessType } from 'src/items/enums/business-type.enums';
import { ItemType } from 'src/items/enums/item-type.enums';
import { ProductionMethod } from 'src/items/enums/production-method.enum';

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
  @ApiProperty({ required: false })
  productionMethod: ProductionMethod;
  @ApiProperty({ required: false })
  type: ItemType;
}
