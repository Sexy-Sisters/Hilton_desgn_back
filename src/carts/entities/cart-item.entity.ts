import { Item } from 'src/items/entities/item.entity';
import { Option } from 'src/items/entities/option.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Item, (item) => item.cartItems)
  item: Item;

  @ManyToMany(() => Option, { cascade: true })
  @JoinTable()
  options: Option[];

  @ManyToOne(() => User, (user) => user.cartItems)
  user: User;
}
