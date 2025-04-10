// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column({ type: 'decimal', default: 0 }) // New balance column
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
