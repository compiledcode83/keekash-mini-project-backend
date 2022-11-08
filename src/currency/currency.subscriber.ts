import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Currency } from './currency.entity';

@EventSubscriber()
export class CurrencySubscriber implements EntitySubscriberInterface<Currency> {
  listenTo(): any {
    return Currency;
  }

  beforeUpdate(event: UpdateEvent<Currency>): void {
    event.entity.updatedAt = new Date();
  }
}
