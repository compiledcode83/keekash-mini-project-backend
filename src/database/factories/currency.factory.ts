import { faker } from '@faker-js/faker';
import { AppDataSource } from '@src/config/datasource';
import { Currency } from '@src/currency/currency.entity';

export class CurrencyFactory {
  static async create(data?: Partial<Currency>) {
    const currency = new Currency();
    currency.name = faker.lorem.word(2);
    currency.symbol = faker.datatype.string(3);

    return AppDataSource.manager.getRepository(Currency).save({ ...currency, ...data });
  }
}
