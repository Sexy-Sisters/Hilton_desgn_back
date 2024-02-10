import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartsService } from 'src/carts/carts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemOption } from './entities/order-item-option.entity';
import { OrderStatus } from './enums/order-status.enums';

@Injectable()
export class OrdersService {
  constructor(
    private readonly cartsService: CartsService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderItemOption)
    private readonly orderItemOptionRepository: Repository<OrderItemOption>,
  ) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    const cartItems = await this.cartsService.getMyCartItems(userId);
    if (cartItems.length == 0) throw new BadRequestException();

    const orderItems = [];
    for (const cartItem of cartItems) {
      const orderItem = this.orderItemRepository.create({
        quantity: cartItem.quantity,
        price: cartItem.item.price,
        color: cartItem.color,
        discountRate: cartItem.item.discountRate,
        item: { id: cartItem.item.id },
      });

      orderItem.orderItemOptions = [];
      for (const option of cartItem.options) {
        const orderItemOption = await this.orderItemOptionRepository.save({
          optionName: option.name,
          optionGroupName: option.optionGroupName,
          price: option.price,
        });
        orderItem.orderItemOptions.push(orderItemOption);
      }
      await this.orderItemRepository.save(orderItem);
      orderItems.push(orderItem);
    }

    const order = await this.orderRepository.create({
      ...createOrderDto,
      user: { id: userId },
      orderItems,
    });
    await this.cartsService.deleteAll(userId);
    return await this.orderRepository.save(order);
  }

  async findOrderDetail(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: [
        'orderItems',
        'orderItems.orderItemOptions',
        'orderItems.item',
      ],
    });
    if (!order) throw new NotFoundException();

    return order;
  }

  async changeOrderStatus(orderId: string, orderStatus: OrderStatus) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException();

    order.orderStatus = orderStatus;
    return this.orderRepository.save(order);
  }

  async getMyOrders(userId: string, orderStatus?: OrderStatus | null) {
    const orders = !orderStatus
      ? await this.orderRepository.find({
          where: { user: { id: userId } },
          relations: ['orderItems', 'orderItems.orderItemOptions'],
          order: {
            createdAt: 'DESC',
          },
        })
      : await this.orderRepository.find({
          where: { user: { id: userId }, orderStatus },
          relations: ['orderItems', 'orderItems.orderItemOptions'],
          order: {
            createdAt: 'DESC',
          },
        });
    const ordersWithTotalPrice = orders.map((order) => {
      let totalPrice = 0;
      const orderItems = order.orderItems.map((orderItem) => {
        const optionsPrice = orderItem.orderItemOptions.reduce(
          (sum, orderItemOption) => {
            return sum + orderItemOption.price;
          },
          0,
        );
        const finalPrice =
          ((orderItem.price + optionsPrice) / 100) *
          (100 - orderItem.discountRate) *
          orderItem.quantity;
        totalPrice += finalPrice;
        return {
          optionsPrice,
          finalPrice,
          ...orderItem,
        };
      }, 0);
      return {
        ...order,
        orderItems,
        totalPrice,
      };
    });
    return ordersWithTotalPrice;
  }
}
