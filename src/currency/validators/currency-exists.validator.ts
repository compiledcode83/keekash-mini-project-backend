import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CurrencyService } from '../currency.service';

@ValidatorConstraint({ name: 'UserExistsValidator', async: true })
export class CurrencyExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly currencyService: CurrencyService) {}

  async validate(currencyId: number) {
    return this.currencyService.isCurrencyExist(currencyId);
  }

  defaultMessage() {
    return `Currency is not valid.`;
  }
}
