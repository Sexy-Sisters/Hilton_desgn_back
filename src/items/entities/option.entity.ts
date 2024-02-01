import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OptionGroup } from './option-group.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => OptionGroup, (optionGroup) => optionGroup.options)
  optionGroup: OptionGroup;
}
