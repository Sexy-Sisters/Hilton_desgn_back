import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import {
  ENV_KAKAO_CALLBACK_URL_KEY,
  ENV_KAKAO_CLIENTID_KEY,
  ENV_KAKAO_SECRET_KEY_KEY,
} from 'src/common/env-keys.const';

export class JwtKakaoStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env[ENV_KAKAO_CLIENTID_KEY],
      clientSecret: process.env[ENV_KAKAO_SECRET_KEY_KEY],
      callbackURL: process.env[ENV_KAKAO_CALLBACK_URL_KEY],
      scope: ['account_email', 'profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      name: profile.username,
      image: profile._json.properties.profile_image,
      email: profile._json.kakao_account.email,
      provider: profile.provider,
    };
  }
}
