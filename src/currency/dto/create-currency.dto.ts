import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { CurrencyExistsBySymbolValidator } from '../validators/currency-exists-by-symbol.validator';

export class CreateCurrencyDto {
  @ApiProperty({ example: 'US Dollar', required: true, description: 'Currency Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'USD', required: true, description: 'Currency Symbol' })
  @IsString()
  @Validate(CurrencyExistsBySymbolValidator)
  symbol: string;
}
