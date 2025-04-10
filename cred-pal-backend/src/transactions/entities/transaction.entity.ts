import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: 'deposit' | 'withdrawal' | 'transfer';

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => User, { nullable: true })
  receiver: User | null;

  @CreateDateColumn()
  timestamp: Date;
}
