import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { OptionGroup } from './entities/option-group.entity';
import { CreateItemDto } from './dtos/request/create-item.dto';
import { ItemType } from './enums/item-type.enums';
import { ItemQuery } from './dtos/request/item-query.dto';

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

  async getItemsWithFilter(itemQuery: ItemQuery): Promise<Item[]> {
    const {
      q,
      page = 1,
      pageSize = 50,
      order,
      category = 'ALL',
      subcategory,
    } = itemQuery;

    let price: 'ASC' | 'DESC' | undefined;
    let createdAt: 'ASC' | 'DESC' | undefined;

    if (order === '높은 가격') {
      price = 'DESC';
    } else if (order === '낮은 가격') {
      price = 'ASC';
    } else if (order === '최신순') {
      createdAt = 'DESC';
    }

    const queryBuilder = this.itemRepository
      .createQueryBuilder('item')
      .where(q ? `item.name LIKE :q` : '1=1', { q: `%${q}%` })
      .andWhere(category === 'ALL' ? '1=1' : 'item.category = :category', {
        category,
      })
      .andWhere(subcategory ? 'item.subcategory = :subcategory' : '1=1', {
        subcategory,
      });

    if (price) {
      queryBuilder.orderBy({ 'item.price': price });
    }
    if (createdAt) {
      queryBuilder.orderBy({ 'item.createdAt': createdAt });
    }

    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    return queryBuilder.getMany();
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

  async updateItem(id: string, updateItemDto: CreateItemDto): Promise<void> {
    const { optionGroupList = [], ...itemData } = updateItemDto;

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

  async getDetailItem(id: string) {
    const item = this.itemRepository.findOne({
      where: {
        id,
      },
      relations: ['optionGroups', 'optionGroups.options'],
    });

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  async deleteItem(id: string) {
    await this.itemRepository.delete(id);
    return;
  }

  async getOptionDetail(id: string) {
    return await this.optionRepository.findOne({
      where: { id },
      relations: ['optionGroup', 'optionGroup.item'],
    });
  }
}
