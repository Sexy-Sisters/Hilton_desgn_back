import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BusinessType } from '../../enums/business-type.enums';
import { ItemStatus } from '../../enums/item-status.enums';
import { ItemType } from '../../enums/item-type.enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  discountRate?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  category?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  subcategory?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: String, isArray: true, required: false })
  colors?: string[];

  @IsOptional()
  @IsEnum(BusinessType, { each: true })
  @ApiProperty({ enum: BusinessType, isArray: true, required: false })
  businessType?: BusinessType[];

  @IsOptional()
  @IsEnum(ItemType)
  @ApiProperty({ enum: ItemType, required: false })
  type?: ItemType;

  @IsOptional()
  @IsEnum(ItemStatus)
  @ApiProperty({ enum: ItemStatus, required: false })
  status?: ItemStatus;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  thumbnailImage?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: String, isArray: true, required: false })
  itemImages?: string[];

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: String, isArray: true, required: false })
  detailImages?: string[];
}
