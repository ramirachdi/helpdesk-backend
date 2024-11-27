import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 12);
    // Overwrite the plain password with the hashed one
    createUserDto.password = hashedPassword;
  
    const newUser = await this.usersService.create(createUserDto);
    const { password: _, ...result } = newUser;
    return result;
  }
  
}
