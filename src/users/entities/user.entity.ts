import { Timestamp } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  provider: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
