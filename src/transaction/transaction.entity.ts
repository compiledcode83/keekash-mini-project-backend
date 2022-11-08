import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Currency } from '@src/currency/currency.entity';
import { User } from '@src/user/user.entity';

@Entity('transaction')
export class Transaction {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'User ID', required: true, example: 1 })
  @Column({ type: 'integer', nullable: false })
  userId: number;

  @ApiProperty({ description: 'Currency ID', required: true, example: 1 })
  @Column({ type: 'integer', nullable: false })
  currencyId: number;

  @ApiProperty({ description: 'Transfer amount', required: true, example: 100 })
  @Column({ type: 'float', nullable: false })
  amount: number;

  @ApiProperty({ description: 'Payment description', example: 'Deposit 100USD' })
  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ApiProperty({ description: 'Date when the transaction was created', required: true })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => Currency, (currency) => currency.transactions)
  currency: Currency;
}
