import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { UserGuard } from './guards/User.guard';
import { CurrentUser } from 'src/decorators/current-user.decorators';
import { User } from 'src/users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
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

  @Get('/user')
  @UseGuards(UserGuard)
  async test(@CurrentUser() user: User) {
    return user;
  }
}
