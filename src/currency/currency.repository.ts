import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Currency } from './currency.entity';

@Injectable()
export class CurrencyRepository extends Repository<Currency> {
  constructor(private readonly dataSource: DataSource) {
    super(Currency, dataSource.manager);
  }
}
