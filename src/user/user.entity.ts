import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Transaction } from '@src/transaction/transaction.entity';
import {
  CreateDateColumn,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: `Unique uuid`, maximum: 36 })
  @Column({ type: 'varchar', nullable: false, length: 36 })
  uuid: string;

  @ApiProperty({ description: 'Full name', maximum: 128, required: false })
  @Column({ type: 'varchar', nullable: true, length: 128 })
  name: string;

  @ApiProperty({ description: 'E-mail', maximum: 255, required: true })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  email: string;

  @ApiProperty({ description: 'Password', maximum: 255, required: true })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  password: string;

  @ApiProperty({ description: 'Date when the user was created', required: true })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Date when user was updated the last time', required: false })
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
