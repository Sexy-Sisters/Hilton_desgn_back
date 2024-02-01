import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { OptionGroup } from './entities/option-group.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemType } from './enums/item-type.enums';

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

    const newItem = new Item();
    Object.assign(newItem, data);
    const createdItem = await this.itemRepository.save(newItem);

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

  async getRecommendItems(limit?: number): Promise<Item[]> {
    return await this.itemRepository
      .createQueryBuilder('item')
      .where('item.type = :type1 OR item.type = :type2', {
        type1: ItemType.RECOMMENDED,
        type2: ItemType.BEST_SELLER,
      })
      .take(limit)
      .getMany();
  }

  async updateItem(id: string, createItemDto: CreateItemDto): Promise<void> {
    const { optionGroupList = [], ...itemData } = createItemDto;

    // Delete existing option groups
    await this.optionGroupRepo.delete({ itemId: id });

    // Update item
    await this.itemRepository.update(id, itemData);

    // Create new option groups
    const item = await this.itemRepository.findOneOrFail({ where: { id } });

    for (const group of optionGroupList) {
      const newOptionGroup = new OptionGroup();
      newOptionGroup.name = group.name;
      newOptionGroup.item = item;
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
