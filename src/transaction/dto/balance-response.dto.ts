import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class BalanceResponseDto {
  @ApiProperty({
    description: 'Currency ID to deposit',
    example: '1',
    required: true,
  })
  @IsInt()
  currencyName: string;

  @ApiProperty({
    description: 'Balance amount',
    example: '100',
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Currency Symbol',
    example: 'USD',
    required: true,
  })
  currencySymbol: string;
}
