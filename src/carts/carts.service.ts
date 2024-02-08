import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ItemsService } from 'src/items/items.service';
import { ChangeQuantityDto } from './dto/change-quantity.dto';
@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly itemsService: ItemsService,
  ) {}

  async addCartItem(userId: string, createCartItemDto: CreateCartItemDto) {
    const { itemId, optionIds, color, quantity } = createCartItemDto;
    const item = await this.itemsService.getDetailItem(itemId);
    if (!item) throw new NotFoundException();

    const cartItem = this.cartItemRepository.create({
      user: { id: userId },
      item: { id: itemId },
      color,
      quantity,
    });
    cartItem.options = [];

    for (const optionId of optionIds) {
      const option = await this.itemsService.getOptionDetail(optionId);
      console.log(option);
      if (item.id != option.optionGroup.item.id)
        throw new BadRequestException();
      cartItem.options.push(option);
    }

    const savedCartItem = await this.cartItemRepository.save(cartItem);
    return {
      ...savedCartItem,
      options: savedCartItem.options.map((option) => {
        const optionGroupName = option.optionGroup.name;
        delete option.optionGroup;
        return {
          ...option,
          optionGroupName,
        };
      }),
    };
  }

  async getMyCartItems(userId: string) {
    const items = await this.cartItemRepository.find({
      where: { user: { id: userId } },
      relations: ['options', 'options.optionGroup', 'item'],
    });
    console.log(items);
    return items.map((item) => {
      return {
        ...item,
        options: item.options.map((option) => {
          const ret = {
            ...option,
            optionGroupName: option.optionGroup.name,
          };
          delete ret.optionGroup;

          return ret;
        }),
      };
    });
  }

  async getCountMyItems(userId: string) {
    return await this.cartItemRepository.count({
      where: { user: { id: userId } },
    });
  }

  async deleteCartItemById(cartId: string) {
    return await this.cartItemRepository.delete(cartId);
  }
  async changeQuantity(id: string, changeQueantityDto: ChangeQuantityDto) {
    return await this.cartItemRepository.update(id, changeQueantityDto);
  }

  async deleteAll(userId: string) {
    console.log(userId);
    return await this.cartItemRepository.delete({ user: { id: userId } });
  }
}
