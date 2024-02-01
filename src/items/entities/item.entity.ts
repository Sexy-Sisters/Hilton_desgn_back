import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemStatus } from '../enums/item-status.enums';
import { ItemType } from '../enums/item-type.enums';
import { BusinessType } from '../enums/business-type.enums';
import { OptionGroup } from './option-group.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  discountRate: number;

  @Column()
  thumbnailImage: string;

  @Column({ type: 'text', array: true })
  itemImages: string[];

  @Column({ type: 'text', array: true })
  detailImages: string[];

  @Column()
  category: string;

  @Column()
  subcategory: string;

  @Column({ type: 'text', array: true })
  colors: string[];

  @Column({ type: 'enum', enum: BusinessType, array: true })
  businessType: BusinessType[];

  @Column({ type: 'enum', enum: ItemType })
  type: ItemType;

  @Column({ type: 'enum', enum: ItemStatus })
  status: ItemStatus;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OptionGroup, (optionGroup) => optionGroup.item)
  optionGroups: OptionGroup[];
}
