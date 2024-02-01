import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import {
  ENV_NAVER_CALLBACK_URL_KEY,
  ENV_NAVER_CLIENTID_KEY,
  ENV_NAVER_SECRET_KEY_KEY,
} from 'src/common/env-keys.const';

export class JwtNaverStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env[ENV_NAVER_CLIENTID_KEY],
      clientSecret: process.env[ENV_NAVER_SECRET_KEY_KEY],
      callbackURL: process.env[ENV_NAVER_CALLBACK_URL_KEY],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      name: profile.displayName,
      image: profile._json.profile_image,
      email: profile._json.email,
      provider: profile.provider,
    };
  }
}
