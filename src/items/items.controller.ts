import { Body, Controller, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.createItem(createItemDto);
  }
}
