import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class WithdrawBalanceDto {
  @ApiProperty({
    description: 'Currency ID to withdraw',
    example: '1',
    required: true,
  })
  @IsInt()
  currencyId: number;

  @ApiProperty({
    description: 'Amount to withdraw',
    example: '100',
    required: true,
  })
  @IsNumber()
  amount: number;
}
