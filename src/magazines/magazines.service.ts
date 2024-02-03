import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';
import { Like, Repository } from 'typeorm';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';

@Injectable()
export class MagazinesService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazinesRepository: Repository<Magazine>,
  ) {}

  async createMagazine(createMagazineDto: CreateMagazineDto) {
    return await this.magazinesRepository.save(createMagazineDto);
  }

  async searchMagazine(q: string) {
    return await this.magazinesRepository.find({
      where: { title: Like(`${q && ''}%`) },
      order: { createdAt: 'DESC' },
    });
  }

  async getDetailMagazine(id: string) {
    const magazine = this.magazinesRepository.findOne({ where: { id } });

    if (!magazine) throw new NotFoundException();

    return magazine;
  }

  async deleteMagazine(id: string) {
    const magazine = this.magazinesRepository.delete(id);

    if (!magazine) throw new NotFoundException();

    return magazine;
  }

  async updateMagazine(id: string, updateMagazineDto: CreateMagazineDto) {
    const magazine = this.magazinesRepository.delete(id);

    if (!magazine) throw new NotFoundException();

    this.magazinesRepository.update(id, updateMagazineDto);
  }
}
