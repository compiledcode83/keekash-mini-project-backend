import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '@src/transaction/transaction.entity';
import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('currency')
export class Currency {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'Currency name', maximum: 128, required: false })
  @Column({ type: 'varchar', nullable: true, length: 128, unique: true })
  name: string;

  @ApiProperty({ description: 'Currency symbol', maximum: 16, required: true })
  @Column({ type: 'varchar', nullable: false, length: 16, unique: true })
  symbol: string;

  @ApiProperty({ description: 'Date when the currency was created', required: true })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Date when currency was updated the last time', required: false })
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.currency)
  transactions: Transaction[];
}
