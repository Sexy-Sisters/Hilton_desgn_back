import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { User } from 'src/users/entities/user.entity';
import { UserGuard } from 'src/auth/guards/User.guard';
import { ApiTags } from '@nestjs/swagger';
import { ChangeQuantityDto } from './dto/change-quantity.dto';

@Controller('carts')
@ApiTags('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('/')
  @UseGuards(UserGuard)
  async addCartItem(
    @CurrentUser() user: User,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartsService.addCartItem(user.id, createCartItemDto);
  }

  @Get('/')
  @UseGuards(UserGuard)
  async getMyCartItem(@CurrentUser() user: User) {
    return this.cartsService.getMyCartItems(user.id);
  }

  @Get('/count')
  @UseGuards(UserGuard)
  async getCountMyItems(@CurrentUser() user: User) {
    return await this.cartsService.getCountMyItems(user.id);
  }

  @Delete('/:id')
  @UseGuards(UserGuard)
  async deleteCartItem(@Param('id') cartItemId: string) {
    return await this.cartsService.deleteCartItemById(cartItemId);
  }

  @Patch('/:id')
  @UseGuards(UserGuard)
  async changeQuantity(
    @Param('id') cartItemId: string,
    @Body() changeQuantityDto: ChangeQuantityDto,
  ) {
    return await this.cartsService.changeQueantity(
      cartItemId,
      changeQuantityDto,
    );
  }
}
