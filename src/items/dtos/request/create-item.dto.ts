import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessType } from '../../enums/business-type.enums';
import { ItemStatus } from '../../enums/item-status.enums';
import { ItemType } from '../../enums/item-type.enums';
import { ApiProperty } from '@nestjs/swagger';

export class Option {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  price: number;
}

export class OptionGroup {
  @IsString()
  @ApiProperty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Option)
  @ApiProperty({ type: Option, isArray: true })
  optionList: Option[];
}

export class CreateItemDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  discountRate: number;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @ApiProperty()
  subcategory: string;

  @IsArray()
  @ApiProperty({ type: String, isArray: true })
  colors: string[];

  @IsEnum(BusinessType, { each: true })
  @ApiProperty({ enum: BusinessType, isArray: true })
  businessType: BusinessType[];

  @IsEnum(ItemType)
  @ApiProperty({ enum: ItemType })
  type: ItemType;

  @IsEnum(ItemStatus)
  @ApiProperty({ enum: ItemStatus })
  status: ItemStatus;

  @IsString()
  @ApiProperty()
  thumbnailImage: string;

  @IsArray()
  @ApiProperty({ type: String, isArray: true })
  itemImages: string[];

  @IsArray()
  @ApiProperty({ type: String, isArray: true })
  detailImages: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionGroup)
  @ApiProperty({ type: OptionGroup, isArray: true })
  optionGroupList: OptionGroup[];
}
