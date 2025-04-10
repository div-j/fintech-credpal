import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
    private usersService: UsersService,
  ) {}

  async deposit(userId: number, amount: number) {
    if (amount <= 0) throw new BadRequestException('Amount must be greater than zero');

    const user = await this.usersService.findById(userId);
    user.balance += amount;

    await this.usersService.update(user);

    const transaction = this.transactionRepo.create({ user, amount, type: 'deposit' });
    return this.transactionRepo.save(transaction);
  }

  async withdraw(userId: number, amount: number) {
    const user = await this.usersService.findById(userId);
    if (amount <= 0 || user.balance < amount) throw new BadRequestException('Insufficient balance');

    user.balance -= amount;

    await this.usersService.update(user);

    const transaction = this.transactionRepo.create({ user, amount, type: 'withdrawal' });
    return this.transactionRepo.save(transaction);
  }

  async transfer(senderId: number, receiverId: number, amount: number) {
    if (amount <= 0) throw new BadRequestException('Amount must be greater than zero');

    const sender = await this.usersService.findById(senderId);
    const receiver = await this.usersService.findById(receiverId);

    if (sender.balance < amount) throw new BadRequestException('Insufficient balance');

    sender.balance -= amount;
    receiver.balance += amount;

    await this.usersService.update(sender);
    await this.usersService.update(receiver);

    const transaction = this.transactionRepo.create({
      user: sender,
      receiver,
      amount,
      type: 'transfer',
    });
    return this.transactionRepo.save(transaction);
  }

  async getBalance(userId: number) {
    const user = await this.usersService.findById(userId);
    return { balance: user.balance };
  }
}
