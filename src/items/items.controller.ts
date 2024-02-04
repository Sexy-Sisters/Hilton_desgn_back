import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemQuery } from './dtos/item-query.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.createItem(createItemDto);
  }

  @Get()
  async getItems(@Query() itemQuery: ItemQuery) {
    return await this.itemsService.getItemsWithFilter(itemQuery);
  }
  @Get('/recommend')
  async getRecommendItems(@Query('limit') limit: number) {
    return await this.itemsService.getRecommendItems(limit);
  }

  @Get('/:id')
  async getDetailItem(@Param('id') id: string) {
    return await this.itemsService.getDetailItem(id);
  }

  @Delete(':/id')
  async deleteItem(@Param('id') id: string) {
    return await this.itemsService.deleteItem(id);
  }

  @Put('/:id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: CreateItemDto,
  ) {
    return await this.itemsService.updateItem(id, updateItemDto);
  }
}
