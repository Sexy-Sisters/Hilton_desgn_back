import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UseInterceptors,
} from '@nestjs/common';
import axios from 'axios';
import { Cache, Config } from 'cache-manager';
import { UsersService } from 'src/users/users.service';
import { makeSignitureForSMS } from './utils/sensApi';
import { makeRand6Num } from './utils/makeRand6Num';
import { sendAuthentinationMessage } from './utils/sendAuthenticationMessage';
import {
  ENV_SMS_ACCESS_KEY_KEY,
  ENV_SMS_SECRET_KEY_KEY,
  ENV_SMS_SERVICE_ID_KEY,
} from 'src/common/env-keys.const';
import { ConfigService } from '@nestjs/config';
@Injectable()
@UseInterceptors(CacheInterceptor)
export class SmsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  sendSMS = async (phoneNumber: string, userId: string) => {
    const SMS_ACCESS_KEY = this.configService.get(ENV_SMS_ACCESS_KEY_KEY);
    const SMS_SECRET_KEY = this.configService.get(ENV_SMS_SECRET_KEY_KEY);
    const SMS_SERVICE_ID = this.configService.get(ENV_SMS_SERVICE_ID_KEY);
    const signiture = makeSignitureForSMS(
      SMS_SECRET_KEY,
      SMS_SERVICE_ID,
      SMS_ACCESS_KEY,
    );
    const checkNumber = makeRand6Num(); // 바디 제작
    const body = sendAuthentinationMessage(checkNumber, phoneNumber);
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-apigw-timestamp': Date.now().toString(),
      'x-ncp-iam-access-key': SMS_ACCESS_KEY,
      'x-ncp-apigw-signature-v2': signiture,
    }; // 문자 보내기 (url)
    axios
      .post(
        `https://sens.apigw.ntruss.com/sms/v2/services/${SMS_SERVICE_ID}/messages`,
        body,
        { headers },
      )
      .catch(async (e) => {
        console.log(JSON.stringify(e));
        throw new BadRequestException();
      });

    await this.cacheManager.set(checkNumber, { phoneNumber, userId });
    return 'send end!';
  };

  checkSMS = async (checkNumber: string, userId: string) => {
    const data = (await this.cacheManager.get(checkNumber)) as {
      phoneNumber: string;
      userId: string;
    };
    if ((data.userId as string) === userId) {
      await this.usersService.verifyPhone(userId, data.phoneNumber);
      return true;
    }
    throw new BadRequestException();
  };
}
