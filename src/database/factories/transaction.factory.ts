import { faker } from '@faker-js/faker';
import { AppDataSource } from '@src/config/datasource';
import { Transaction } from '@src/transaction/transaction.entity';

export class TransactionFactory {
  static async create(data?: Partial<Transaction>) {
    const transaction = new Transaction();
    transaction.amount = Math.floor(Math.random() * 100);
    transaction.description = faker.lorem.word(5);

    return AppDataSource.manager.getRepository(Transaction).save({ ...transaction, ...data });
  }
}
