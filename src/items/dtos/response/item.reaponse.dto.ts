import { BusinessType } from '../../enums/business-type.enums';
import { ItemStatus } from '../../enums/item-status.enums';
import { ItemType } from '../../enums/item-type.enums';
import { ApiProperty } from '@nestjs/swagger';

export class ItemResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discountRate: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  subcategory: string;

  @ApiProperty({ type: String, isArray: true })
  colors: string[];

  @ApiProperty({ enum: BusinessType, isArray: true })
  businessType: BusinessType[];

  @ApiProperty({ enum: ItemType })
  type: ItemType;

  @ApiProperty({ enum: ItemStatus })
  status: ItemStatus;

  @ApiProperty()
  thumbnailImage: string;

  @ApiProperty({ type: String, isArray: true })
  itemImages: string[];

  @ApiProperty({ type: String, isArray: true })
  detailImages: string[];
}
