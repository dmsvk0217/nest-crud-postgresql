import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signIn(user: any): { accessToken: string } {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return await this.userRepository.createUser(authCredentialDto);
  }

  async validateUser(authCredentialDto: AuthCredentialDto): Promise<any> {
    const { username, password: plainTestPassword } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('logIn failed: user not found');
    }

    const pwValidResult = await bcrypt.compare(
      plainTestPassword,
      user.password,
    );

    if (!pwValidResult) {
      throw new UnauthorizedException('logIn failed: incorrect password');
    }

    const { password, ...result } = user;
    return result;
  }
}
