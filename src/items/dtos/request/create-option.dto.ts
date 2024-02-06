import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty({ nullable: true })
  @IsString({ always: false })
  name: string;

  @ApiProperty()
  @IsString()
  price: number;
}
