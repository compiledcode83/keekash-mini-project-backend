import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { UserModule } from '@src/user/user.module';
import { CurrencyModule } from '@src/currency/currency.module';

@Module({
  imports: [UserModule, CurrencyModule],
  providers: [TransactionService, TransactionRepository],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
