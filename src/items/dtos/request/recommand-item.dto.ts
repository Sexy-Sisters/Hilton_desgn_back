import { IsString } from 'class-validator';

export class RecommendItemDto {
  @IsString()
  limit: string;
}
