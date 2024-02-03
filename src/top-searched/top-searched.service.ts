import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TopSearched } from './entities/top-searched.entity';
import { Repository } from 'typeorm';
import { UpdateTopSearchedDto } from './dto/update-top-searched.dto';
@Injectable()
export class TopSearchedService {
  constructor(
    @InjectRepository(TopSearched)
    private readonly topSearchedRepo: Repository<TopSearched>,
  ) {}

  async update(updateTopSearchedDto: UpdateTopSearchedDto) {
    return await this.topSearchedRepo.save(updateTopSearchedDto);
  }
  async findAll() {
    return await this.topSearchedRepo.find({ order: { rank: 'asc' } });
  }
}
