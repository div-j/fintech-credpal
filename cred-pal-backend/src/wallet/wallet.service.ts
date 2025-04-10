import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    //   get balance
    async getBalance(userId: number): Promise<number> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        return user.balance;
    }

    //fund wallet
    async fundWallet(userId: number, amount: number): Promise<number> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        user.balance += amount;
        await this.usersRepository.save(user);
        return  user.balance;
    }
}
