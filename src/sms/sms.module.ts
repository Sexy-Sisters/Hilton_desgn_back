import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { UsersModule } from 'src/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [UsersModule, CacheModule.register({ ttl: 600, max: 1000 })],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
