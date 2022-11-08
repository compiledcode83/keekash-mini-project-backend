import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { CurrencyRepository } from './currency.repository';
import { CurrencyExistsBySymbolValidator } from './validators/currency-exists-by-symbol.validator';

@Module({
  providers: [CurrencyService, CurrencyRepository, CurrencyExistsBySymbolValidator],
  controllers: [CurrencyController],
  exports: [CurrencyService],
})
export class CurrencyModule {}
