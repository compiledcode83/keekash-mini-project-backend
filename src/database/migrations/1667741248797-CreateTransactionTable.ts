import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTransactionTable1667741248797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            unsigned: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'currency_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '256',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('transaction', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['currency_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'currency',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transaction');
    const userIdForeignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    const currencyIdForeignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('currency_id') !== -1);
    await queryRunner.dropForeignKey('transaction', userIdForeignKey);
    await queryRunner.dropForeignKey('transaction', currencyIdForeignKey);
    await queryRunner.dropColumn('transaction', 'user_id');
    await queryRunner.dropColumn('transaction', 'currency_id');
    await queryRunner.dropTable('transaction');
  }
}
