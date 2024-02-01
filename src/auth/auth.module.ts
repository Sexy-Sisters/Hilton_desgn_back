import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtKakaoStrategy } from './strategies/kakao.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ENV_JWT_SECRET_KEY_KEY } from 'src/common/env-keys.const';
import { JwtStratgy } from './jwt/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtNaverStrategy } from './strategies/naver.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(ENV_JWT_SECRET_KEY_KEY),
        signOptions: { expiresIn: '1y' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtKakaoStrategy, JwtStratgy, JwtNaverStrategy],
})
export class AuthModule {}
