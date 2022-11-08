import { faker } from '@faker-js/faker';
import { AppDataSource } from '@src/config/datasource';
import { User } from '@src/user/user.entity';

export class UserFactory {
  static async create(data?: Partial<User>) {
    const user = new User();
    user.name = faker.name.firstName();
    user.email = faker.internet.email();

    return AppDataSource.manager.getRepository(User).save({ ...user, ...data });
  }
}
