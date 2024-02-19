import * as crypto from 'crypto';

export const makeSignitureForSMS = (
  secretKey: string,
  serivceId: string,
  accessKeyId: string,
): string => {
  console.log(serivceId, secretKey, accessKeyId);
  const message = [];
  const hmac = crypto.createHmac('sha256', secretKey);
  const timeStamp = Date.now().toString();
  const space = ' ';
  const newLine = '\n';
  const method = 'POST';
  message.push(method);
  message.push(space);
  message.push(`/sms/v2/services/${serivceId}/messages`);
  message.push(newLine);
  message.push(timeStamp);
  message.push(newLine);
  message.push(accessKeyId); // 시그니쳐 생성
  const signiture = hmac.update(message.join('')).digest('base64'); // string 으로 반환
  return signiture.toString();
};
