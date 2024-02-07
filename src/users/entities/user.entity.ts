import { Timestamp } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { CartItem } from 'src/carts/entities/cart-item.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  provider: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];
}
