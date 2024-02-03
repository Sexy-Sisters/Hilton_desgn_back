import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Magazine {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column()
  content: string;

  @Column()
  writer: string;

  @Column()
  thumbnailImage: string;

  @Column()
  categories: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
