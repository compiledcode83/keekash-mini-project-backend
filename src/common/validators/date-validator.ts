import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DateTime } from 'luxon';

@ValidatorConstraint({ name: 'DateValidator', async: true })
export class DateValidator implements ValidatorConstraintInterface {
  async validate(date: string) {
    if (date) {
      const luxonDate = DateTime.fromFormat(date, 'yyyy-MM-dd');

      return luxonDate.isValid;
    }

    return false;
  }

  defaultMessage() {
    return `date should be yyyy-MM-dd.`;
  }
}
