import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepo.findOne({ where: { email } });
        return user || undefined; // Ensure null is converted to undefined
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.userRepo.create(userData);
        return this.userRepo.save(user);
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async update(user: User): Promise<User> {
        return this.userRepo.save(user);
    }
}
