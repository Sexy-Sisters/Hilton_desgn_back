import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UseInterceptors,
} from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';

const ACCESS_KEY_ID = process.env.NAVER_ACCESS_KEY_ID;
const SECRET_KEY = process.env.NAVER_SECRET_KEY;
const SMS_SERVICE_ID = process.env.NAVER_SMS_SERVICE_ID;

@Injectable()
@UseInterceptors(CacheInterceptor)
export class SmsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  makeSignitureForSMS = (): string => {
    const message = [];
    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    const timeStamp = Date.now().toString();
    const space = ' ';
    const newLine = '\n';
    const method = 'POST';
    message.push(method);
    message.push(space);
    message.push(`/sms/v2/services/${SMS_SERVICE_ID}/messages`);
    message.push(newLine);
    message.push(timeStamp);
    message.push(newLine);
    message.push(ACCESS_KEY_ID); // 시그니쳐 생성
    const signiture = hmac.update(message.join('')).digest('base64'); // string 으로 반환
    return signiture.toString();
  }; // 무작위 6자리 랜덤 번호 생성하기
  makeRand6Num = (): number => {
    const randNum = Math.floor(Math.random() * 1000000);
    return randNum;
  }; // SMS 발송 로직
  sendSMS = async (phoneNumber: string, userId: string) => {
    // TODO : 1일 5회 문자인증 초과했는지 확인하는 로직 필요!
    const signiture = this.makeSignitureForSMS(); // 캐시에 있던 데이터 삭제
    await this.cacheManager.del(phoneNumber); // 난수 생성 (6자리로 고정)
    const checkNumber = this.makeRand6Num().toString().padStart(6, '0'); // 바디 제작
    const body = {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: '발신번호',
      content: `인증번호는 [${checkNumber}] 입니다.`,
      messages: [
        {
          to: phoneNumber,
        },
      ],
    }; // 헤더 제작
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-apigw-timestamp': Date.now().toString(),
      'x-ncp-iam-access-key': ACCESS_KEY_ID,
      'x-ncp-apigw-signature-v2': signiture,
    }; // 문자 보내기 (url)
    axios
      .post(
        `https://sens.apigw.ntruss.com/sms/v2/services/${SMS_SERVICE_ID}/messages`,
        body,
        { headers },
      )
      .catch(async (e) => {
        // 에러일 경우 반환값
        console.log(JSON.stringify(e));
        throw new InternalServerErrorException();
      }); // 캐시 추가하기
    await this.cacheManager.set(phoneNumber, { checkNumber, userId });
    return 'send end!';
  }; // SMS 확인 로직, 문자인증은 3분 이내에 입력해야지 가능합니다!
  checkSMS = async (
    phoneNumber: string,
    inputNumber: string,
  ): Promise<boolean> => {
    const sentNumber = (await this.cacheManager.get(phoneNumber)) as string;
    if (sentNumber === inputNumber) return true;
    else return false;
  };
}
