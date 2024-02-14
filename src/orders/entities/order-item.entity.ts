import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemOption } from './order-item-option.entity';
import { Order } from './order.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  color: string;

  @Column()
  discountRate: number;

  @OneToMany(
    () => OrderItemOption,
    (orderItemOption) => orderItemOption.orderItem,
  )
  orderItemOptions: OrderItemOption[];

  @ManyToOne(() => Item, (item) => item.orderItems)
  item: Item;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @CreateDateColumn()
  createdAt: Date;
}
