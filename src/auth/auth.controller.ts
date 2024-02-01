import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

import { Response, Request } from 'express';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/User.guard';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { User } from 'src/users/entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(@Req() req: Request, @Res() res: Response) {
    return this.authService.OAuthLogin({ req, res });
  }

  @Get('/naver/callback')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(@Req() req: Request, @Res() res: Response) {
    return this.authService.OAuthLogin({ req, res });
  }

  @Get('/test')
  @UseGuards(UserGuard, AdminGuard)
  async test(@CurrentUser() user: User) {
    return user;
  }
}
