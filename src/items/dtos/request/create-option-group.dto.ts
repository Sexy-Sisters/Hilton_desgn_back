import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionGroupDto {
  @IsString()
  @ApiProperty()
  name: string;
}
