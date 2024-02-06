import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionGroup } from './entities/option-group.entity';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { Item } from './entities/item.entity';
import { CreateOptionDto } from './dtos/request/create-option.dto';
import { UpdateOptionDto } from './dtos/request/update-option.dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(OptionGroup)
    private readonly optionGroupRepo: Repository<OptionGroup>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Item)
    private readonly ItemRepository: Repository<Item>,
  ) {}

  async createOptionGroup(itemId: string, name: string) {
    const item = this.ItemRepository.findOneBy({ id: itemId });
    if (!item) throw new NotFoundException('item not found');
    return await this.optionGroupRepo.save({ name, item: { id: itemId } });
  }

  async createOption(optionGroupId: string, createOptionDto: CreateOptionDto) {
    const item = this.optionGroupRepo.findOneBy({ id: optionGroupId });
    if (!item) throw new NotFoundException('optionGroup not found');
    return await this.optionRepository.save({
      optionGroup: { id: optionGroupId },
      ...createOptionDto,
    });
  }

  async deleteOptionGroup(optionGroupId: string) {
    const optionGroup = await this.optionGroupRepo.findOne({
      where: { id: optionGroupId },
    });
    if (!optionGroup) throw new NotFoundException('optionGroup not fount');
    this.optionGroupRepo.delete(optionGroupId);
    return;
  }

  async deleteOption(optionId: string) {
    const optionGroup = await this.optionRepository.findOne({
      where: { id: optionId },
    });
    if (!optionGroup) throw new NotFoundException('optionGroup not fount');
    this.optionGroupRepo.delete(optionId);
    return;
  }

  async ChangeOptionGroupName(optionGroupId: string, name: string) {
    const optionGroup = await this.optionGroupRepo.findOne({
      where: { id: optionGroupId },
    });
    if (!optionGroup) throw new NotFoundException('optionGroup not fount');

    this.optionGroupRepo.update(optionGroupId, { name });
    return await this.optionGroupRepo.findOneBy({ id: optionGroupId });
  }

  async updateOption(optionId: string, updateOptionDto: UpdateOptionDto) {
    const optionGroup = await this.optionRepository.findOne({
      where: { id: optionId },
    });
    if (!optionGroup) throw new NotFoundException('option not fount');

    this.optionGroupRepo.update(optionId, updateOptionDto);
    return await this.optionGroupRepo.findOneBy({ id: optionId });
  }
}
