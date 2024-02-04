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
import { CreateItemDto } from './dtos/request/create-item.dto';
import { ItemQuery } from './dtos/request/item-query.dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemResponseDto } from './dtos/response/item.reaponse.dto';
import { ItemDetailResponseDto } from './dtos/response/item-detail.response.dto';
@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.createItem(createItemDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ItemResponseDto, isArray: true })
  async getItems(@Query() itemQuery: ItemQuery) {
    return await this.itemsService.getItemsWithFilter(itemQuery);
  }

  @Get('/recommend')
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiCreatedResponse({ type: ItemResponseDto, isArray: true })
  async getRecommendItems(@Query('limit') limit: number) {
    return await this.itemsService.getRecommendItems(limit);
  }

  @Get('/:id')
  @ApiCreatedResponse({ type: ItemDetailResponseDto })
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
