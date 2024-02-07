import { ItemResponseDto } from './item.reaponse.dto';

export class ItemPagingDto {
  total: number;
  totalPage: number;
  items: ItemResponseDto;
}
