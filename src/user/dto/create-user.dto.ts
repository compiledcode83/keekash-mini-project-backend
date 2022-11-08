import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { UserExistsByEmailValidator } from '../validators/user-exists-by-email.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', required: true, minimum: 1, maximum: 128, description: 'Full name' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name: string;

  @ApiProperty({ example: 'user@example.com', required: true, maximum: 255, description: 'E-mail' })
  @IsEmail()
  @MaxLength(255)
  @Validate(UserExistsByEmailValidator)
  email: string;

  @ApiProperty({ example: 'password123!@#', required: true, maximum: 255, description: 'Password' })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}
