import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class OrderItemOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  optionName: string;

  @Column()
  optionGroupName: string;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.orderItemOptions, {
    onDelete: 'CASCADE',
  })
  orderItem: OrderItem;

  @CreateDateColumn()
  createdAt: Date;
}
