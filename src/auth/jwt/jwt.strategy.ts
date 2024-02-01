import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENV_JWT_SECRET_KEY_KEY } from 'src/common/env-keys.const';
import { TokenPayLoad } from './tokenPayload.inteface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStratgy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env[ENV_JWT_SECRET_KEY_KEY],
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayLoad) {
    return this.userService.getUserById(payload.userId);
  }
}
