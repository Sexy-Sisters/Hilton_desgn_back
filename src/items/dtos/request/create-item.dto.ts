import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessType } from '../../enums/business-type.enums';
import { ItemStatus } from '../../enums/item-status.enums';
import { ItemType } from '../../enums/item-type.enums';
import { ApiProperty } from '@nestjs/swagger';
import { ProductionMethod } from 'src/items/enums/production-method.enum';

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
  @ApiProperty({ type: String, nullable: true })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  discountRate: number;

  @IsString({ always: true })
  @ApiProperty({ nullable: true })
  category: string;

  @IsString({ always: true })
  @ApiProperty({ nullable: true })
  subcategory: string;

  @IsArray({ always: false })
  @ApiProperty({ type: String, isArray: true, nullable: true })
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
  @ApiProperty({ type: String, nullable: true })
  thumbnailImage: string;

  @IsArray({ always: false })
  @ApiProperty({ type: String, isArray: true, nullable: true })
  itemImages: string[];

  @IsArray({ always: false })
  @ApiProperty({ type: String, isArray: true, nullable: true })
  detailImages: string[];

  @IsOptional()
  @IsEnum(ProductionMethod)
  @ApiProperty({ type: 'enum', enum: ProductionMethod })
  productionMethod: ProductionMethod;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionGroup)
  @ApiProperty({ type: OptionGroup, isArray: true })
  optionGroupList: OptionGroup[];
}
