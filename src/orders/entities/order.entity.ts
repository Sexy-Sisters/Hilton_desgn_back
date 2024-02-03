import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '../enums/order-status.enums';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.BEGIN_CHECKOUT,
  })
  orderStatus: OrderStatus;

  @Column()
  postalCode: string;

  @Column()
  address: string;

  @Column()
  depositor: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;
}
