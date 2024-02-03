import { Module } from '@nestjs/common';
import { TopSearchedService } from './top-searched.service';
import { TopSearchedController } from './top-searched.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopSearched } from './entities/top-searched.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopSearched])],
  controllers: [TopSearchedController],
  providers: [TopSearchedService],
})
export class TopSearchedModule {}
