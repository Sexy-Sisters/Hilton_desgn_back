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
import { UpdateItemDto } from './dtos/request/update-item.dto';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dtos/request/create-option.dto';
import { UpdateOptionDto } from './dtos/request/update-option.dto';
import { CreateOptionGroupDto } from './dtos/request/create-option-group.dto';
@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly optionsService: OptionsService,
  ) {}

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

  @Delete('/:id')
  async deleteItem(@Param('id') id: string) {
    return await this.itemsService.deleteItem(id);
  }

  @Put('/:id')
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return await this.itemsService.updateItem(id, updateItemDto);
  }

  @Post('/optionGroup/:id')
  createOptinGroup(
    @Param('id') itemid: string,
    @Body() createOptoinGroupDto: CreateOptionGroupDto,
  ) {
    return this.optionsService.createOptionGroup(
      itemid,
      createOptoinGroupDto.name,
    );
  }

  @Post('/option/:id')
  createOption(
    @Param('id') optionGroupId: string,
    @Body() createOptionDto: CreateOptionDto,
  ) {
    return this.optionsService.createOption(optionGroupId, createOptionDto);
  }

  @Delete('/optionGroup/:id')
  deleteOptionGroup(@Param('id') optionGroupId: string) {
    return this.optionsService.deleteOptionGroup(optionGroupId);
  }

  @Delete('/option/:id')
  deleteOption(@Param('id') optionId: string) {
    return this.optionsService.deleteOption(optionId);
  }

  @Put('optionGroup/:id')
  updateOptionGroup(
    @Param('id') id: string,
    @Body() createOptionGroupDto: CreateOptionGroupDto,
  ) {
    return this.optionsService.ChangeOptionGroupName(
      id,
      createOptionGroupDto.name,
    );
  }

  @Put('/option/:id')
  updateOption(
    @Param('id') id: string,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionsService.updateOption(id, updateOptionDto);
  }
}
