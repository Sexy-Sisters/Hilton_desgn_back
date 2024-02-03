import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TopSearched {
  @PrimaryColumn()
  rank: number;

  @Column()
  keyword: string;
}
