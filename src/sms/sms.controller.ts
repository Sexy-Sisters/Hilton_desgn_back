import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SmsService } from './sms.service';
import { UserGuard } from 'src/auth/guards/User.guard';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('sendNumber')
  @UseGuards(UserGuard)
  sendCertificationNumber(
    @CurrentUser() user: User,
    @Body('phoneNumber') phoneNumber: string,
  ) {
    return this.smsService.sendSMS(phoneNumber, user.id);
  }

  @Post('verify')
  @UseGuards(UserGuard)
  verifyCertifinationNumber(
    @CurrentUser() user: User,
    @Body('checkNumber') checkNumber: string,
  ) {
    this.smsService.checkSMS(checkNumber, user.id);
  }
}
