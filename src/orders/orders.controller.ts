import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { User } from 'src/users/entities/user.entity';
import { UserGuard } from 'src/auth/guards/User.guard';
import { OrderStatus } from './enums/order-status.enums';
import { ApiTags } from '@nestjs/swagger';
import { changeAddressDto } from './dto/change-address.dto';

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

  @Put(':id')
  @UseGuards(UserGuard)
  changeAddress(
    @Param('id') id: string,
    @Body() changeAddressDto: changeAddressDto,
    @CurrentUser() user: User,
  ) {
    return this.ordersService.changeAddress(id, user.id, changeAddressDto);
  }

  @Put(':id/extendDepositDeadLineTime')
  @UseGuards(UserGuard)
  extendDepositDeadLineTime(@Param('id') orderId: string) {
    return this.ordersService.extendDepositDeadLineTime(orderId);
  }

  @Put(':id/toggleDepositCheckRequest')
  @UseGuards(UserGuard)
  toggleDepositCheckRequestStatus(@Param('id') orderId: string) {
    return this.ordersService.toggleDepositCheckRequestStatus(orderId);
  }
  @Delete(':id')
  @UseGuards(UserGuard)
  cancleOrder(@Param('id') orderId: string, @CurrentUser() user: User) {
    return this.ordersService.deleteOrder(orderId, user.id);
  }
  @Get()
  @UseGuards(UserGuard)
  getMyOrders(
    @CurrentUser() user: User,
    @Query() { orderStatus }: { orderStatus: OrderStatus },
  ) {
    return this.ordersService.getMyOrders(user.id, orderStatus);
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
