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
import { MagazinesService } from './magazines.service';
import { CreateMagazineDto } from './dto/create-magazine.dto';

@Controller('magazines')
export class MagazinesController {
  constructor(private readonly magazinesService: MagazinesService) {}

  @Post('')
  async createMagazine(@Body() createMagazineDto: CreateMagazineDto) {
    return await this.magazinesService.createMagazine(createMagazineDto);
  }

  @Post('')
  async searchMagazine(@Query('q') q: string) {
    return await this.magazinesService.searchMagazine(q);
  }

  @Get('/:id')
  async getDetailMagazine(@Param('id') id: string) {
    return await this.magazinesService.getDetailMagazine(id);
  }

  @Delete('/:id')
  async deleteMagazine(@Param('id') id: string) {
    return await this.magazinesService.deleteMagazine(id);
  }

  @Put('/:id')
  async updateMagazine(
    @Param('id') id: string,
    updateMagazineDto: CreateMagazineDto,
  ) {
    return await this.magazinesService.updateMagazine(id, updateMagazineDto);
  }
}
