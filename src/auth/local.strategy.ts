import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const authCredentialDto: AuthCredentialDto = { username, password };
    const user = await this.authService.validateUser(authCredentialDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return authCredentialDto;
  }
}
