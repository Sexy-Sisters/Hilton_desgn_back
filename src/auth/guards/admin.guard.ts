import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private relector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user;
    return user.role == Role.ADMIN;
  }
}
