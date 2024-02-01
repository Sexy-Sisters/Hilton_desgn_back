import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TokenPayLoad } from './jwt/tokenPayload.inteface';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ENV_CLIENT_URL_KEY } from 'src/common/env-keys.const';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async OAuthLogin({ req, res }: { req: any; res: Response }) {
    const user = await this.userService.createUsers(req.user);
    const payload: TokenPayLoad = {
      userId: user.id,
      name: user.name,
      email: user.email,
    };
    return res
      .cookie('TOKEN', this.jwtService.sign(payload))
      .redirect(this.configService.get<string>(ENV_CLIENT_URL_KEY));
  }
}
