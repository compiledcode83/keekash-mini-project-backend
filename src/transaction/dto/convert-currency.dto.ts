import { ApiProperty } from '@nestjs/swagger';
import { CurrencyExistsValidator } from '@src/currency/validators/currency-exists.validator';
import { IsInt, IsNumber, NotEquals, Validate } from 'class-validator';

export class ConvertCurrencyDto {
  @ApiProperty({
    description: 'Currency ID converted from',
    example: '1',
    required: true,
  })
  @IsInt()
  @Validate(CurrencyExistsValidator)
  fromCurrencyId: number;

  @ApiProperty({
    description: 'Currency amount converted from',
    example: '100',
    required: true,
  })
  @IsNumber()
  fromCurrencyAmount: number;

  @ApiProperty({
    description: 'Currency ID converted to',
    example: '2',
    required: true,
  })
  @IsInt()
  @Validate(CurrencyExistsValidator)
  @NotEquals('fromCurrencyId')
  toCurrencyId: number;

  @ApiProperty({
    description: 'Currency amount converted to',
    example: '123.4',
    required: true,
  })
  @IsNumber()
  toCurrencyAmount: number;
}
