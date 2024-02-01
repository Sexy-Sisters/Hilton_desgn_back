import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { OptionGroup } from './entities/option-group.entity';
import { CreateItemDto } from './dtos/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(OptionGroup)
    private readonly optionGroupRepo: Repository<OptionGroup>,
  ) {}
  async createItem(createItemDto: CreateItemDto): Promise<void> {
    const { optionGroupList = [], ...data } = createItemDto;

    // Create Item
    const newItem = new Item();
    Object.assign(newItem, data);
    const createdItem = await this.itemRepository.save(newItem);

    // Create OptionGroups and Options
    for (const group of optionGroupList) {
      const newOptionGroup = new OptionGroup();
      newOptionGroup.name = group.name;
      newOptionGroup.item = createdItem;
      const createdOptionGroup =
        await this.optionGroupRepo.save(newOptionGroup);

      for (const optionData of group.optionList) {
        const newOption = new Option();
        Object.assign(newOption, optionData);
        newOption.optionGroup = createdOptionGroup;
        await this.optionRepository.save(newOption);
      }
    }
  }
}
