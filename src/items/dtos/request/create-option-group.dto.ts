import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionGroupDto {
  @ApiProperty({ nullable: true })
  @IsString({ always: false })
  name: string;
}
