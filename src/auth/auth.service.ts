import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/user/user.entity';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(user: Partial<User>) {
    const payload = { name: user.name, email: user.email, uuid: user.uuid };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<Partial<User> | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return { name: user.name, email: user.email, uuid: user.uuid };
    }

    return null;
  }
}
