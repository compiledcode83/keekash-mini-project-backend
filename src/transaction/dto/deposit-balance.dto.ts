import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class DepositBalanceDto {
  @ApiProperty({
    description: 'Currency ID to deposit',
    example: '1',
    required: true,
  })
  @IsInt()
  currencyId: number;

  @ApiProperty({
    description: 'Amount to deposit',
    example: '100',
    required: true,
  })
  @IsNumber()
  amount: number;
}
