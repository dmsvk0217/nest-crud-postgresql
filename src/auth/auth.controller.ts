import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from './auth.guard';
import { LocalAuthGuard } from './auth.local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  singIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): {
    accessToken: string;
  } {
    return this.authService.signIn(authCredentialDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
