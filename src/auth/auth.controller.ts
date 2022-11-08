import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from '@src/user/user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';
import { User } from '@src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @ApiResponse(ApiResponseHelper.success(User))
  @ApiResponse(ApiResponseHelper.validationError(`Validation failed`))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiResponse(ApiResponseHelper.success(User))
  @ApiResponse(ApiResponseHelper.unauthorized())
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async success(@Request() req) {
    return req.user;
  }
}
