import { Injectable } from '@nestjs/common';
import { CurrencyService } from '@src/currency/currency.service';
import { UserService } from '@src/user/user.service';
import { PagingResult } from 'typeorm-cursor-pagination';
import { TransactionFilterDto } from './dto/transaction.filter.dto';
import { Transaction } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
  ) {}

  async findAllPaginated(searchParams: TransactionFilterDto, userUuid: string): Promise<PagingResult<Transaction>> {
    const { id: userId } = await this.userService.findByUuid(userUuid);

    return this.transactionRepository.getPaginatedQueryBuilder({ ...searchParams, userId });
  }

  async getBalanceByCurrency(userUuid: string, symbol: string): Promise<number> {
    const { id: userId } = await this.userService.findByUuid(userUuid);
    const { id: currencyId } = await this.currencyService.findBySymbol(symbol);

    return this.transactionRepository.getBalanceByCurrency(userId, currencyId);
  }

  async getBalanceAll(userUuid: string) {
    const { id: userId } = await this.userService.findByUuid(userUuid);

    return this.transactionRepository.getBalanceAll(userId);
  }

  async convertCurrency(
    fromCurrencyId: number,
    fromCurrencyAmount: number,
    toCurrencyId: number,
    toCurrencyAmount: number,
    userUuid: string,
  ): Promise<null> {
    const { id: userId } = await this.userService.findByUuid(userUuid);

    return this.transactionRepository.convertCurrency(
      fromCurrencyId,
      fromCurrencyAmount,
      toCurrencyId,
      toCurrencyAmount,
      userId,
    );
  }

  async createTransaction(
    currencyId: number,
    amount: number,
    userUuid: string,
    description: string,
  ): Promise<Transaction> {
    const { id: userId } = await this.userService.findByUuid(userUuid);

    const transaction = await this.transactionRepository.save({
      userId,
      currencyId,
      amount,
      description,
    });

    return this.transactionRepository.findOneBy({ id: transaction.id });
  }
}
