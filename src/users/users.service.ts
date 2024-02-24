import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUser({email, provider}) {
    let user = await this.userRepository.findOne({
      where: { email, provider },
    });
    return user;
  }


  async createUsers(createUserDto: CreateUserDto) {
    
    return await this.userRepository.save(createUserDto);
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException();

    return user;
  }
  async verifyPhone(userId: string, phoneNumber: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException();

    await this.userRepository.update(userId, { phoneNumber });
    return true;
  }
}
