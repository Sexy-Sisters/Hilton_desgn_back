import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { User } from 'src/users/entities/user.entity';
import { UserGuard } from 'src/auth/guards/User.guard';
import { OrderStatus } from './enums/order-status.enums';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(UserGuard)
  createOrder(
    @CurrentUser() user: User,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(user.id, createOrderDto);
  }

  @Get()
  @UseGuards(UserGuard)
  getMyOrders(@CurrentUser() user: User) {
    return this.ordersService.getMyOrders(user.id);
  }

  @Get(':id')
  findOrderDetail(@Param('id') id: string) {
    return this.ordersService.findOrderDetail(id);
  }

  @Put(':id')
  chageStatus(
    @Param('id') orderId: string,
    @Body() { orderStatus }: { orderStatus: OrderStatus },
  ) {
    return this.ordersService.changeOrderStatus(orderId, orderStatus);
  }
}
