import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from './option.entity';
import { Item } from './item.entity';

@Entity()
export class OptionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Option, (option) => option.optionGroup, { cascade: true })
  options: Option[];

  @ManyToOne(() => Item, (item) => item.optionGroups)
  item: Item;
}
