import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.createItem(createItemDto);
  }

  @Get('/recommend')
  async getRecommendItems(@Query('limit') limit: number) {
    return await this.itemsService.getRecommendItems(limit);
  }

  @Get('/:id')
  async getDetailItem(@Param('id') id: string) {
    return await this.itemsService.getDetailItem(id);
  }
}
