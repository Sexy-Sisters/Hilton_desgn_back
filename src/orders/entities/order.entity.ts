import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '../enums/order-status.enums';
import { User } from 'src/users/entities/user.entity';

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

  @Column({
    nullable: true,
  })
  depositDeadLineTime: Date;

  @Column({
    default: false,
  })
  depositCheckRequest: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
