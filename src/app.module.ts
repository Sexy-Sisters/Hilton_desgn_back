import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from './common/env-keys.const';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ItemsModule } from './items/items.module';
import { Item } from './items/entities/item.entity';
import { OptionGroup } from './items/entities/option-group.entity';
import { Option } from './items/entities/option.entity';
import { CartsModule } from './carts/carts.module';
import { CartItem } from './carts/entities/cart-item.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { OrderItemOption } from './orders/entities/order-item-option.entity';
import { MagazinesModule } from './magazines/magazines.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env[ENV_DB_HOST_KEY],
      port: parseInt(process.env[ENV_DB_PORT_KEY]),
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_DATABASE_KEY],
      entities: [
        User,
        Item,
        Option,
        OptionGroup,
        CartItem,
        Order,
        OrderItem,
        OrderItemOption,
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ItemsModule,
    CartsModule,
    OrdersModule,
    MagazinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
