import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CurrencyService } from '../currency.service';

@ValidatorConstraint({ name: 'currencyExistsBySymbolValidator', async: true })
export class CurrencyExistsBySymbolValidator implements ValidatorConstraintInterface {
  constructor(private readonly currencyService: CurrencyService) {}

  async validate(symbol: string, args: ValidationArguments): Promise<boolean> {
    const currencyExists = await this.currencyService.findBySymbol(symbol);

    return !Boolean(currencyExists);
  }

  defaultMessage(args: ValidationArguments) {
    return `Currency with symbol '${args.value}' already exists`;
  }
}
