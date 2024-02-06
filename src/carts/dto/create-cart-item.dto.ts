import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsString()
  itemId: string;

  @IsArray()
  @ApiProperty({ isArray: true, type: String })
  optionIds: string[];

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @IsString()
  @ApiProperty()
  color: string;
}
