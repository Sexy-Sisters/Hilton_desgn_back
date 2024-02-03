import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Option } from './entities/option.entity';
import { OptionGroup } from './entities/option-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Option, OptionGroup])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
