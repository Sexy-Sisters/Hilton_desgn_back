import { Module } from '@nestjs/common';
import { MagazinesService } from './magazines.service';
import { MagazinesController } from './magazines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Magazine])],
  controllers: [MagazinesController],
  providers: [MagazinesService],
})
export class MagazinesModule {}
