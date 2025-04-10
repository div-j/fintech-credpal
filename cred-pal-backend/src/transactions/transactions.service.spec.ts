import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let usersService: Partial<UsersService>;
  let transactionRepo: Partial<Repository<Transaction>>;

  beforeEach(async () => {
    usersService = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    transactionRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: UsersService, useValue: usersService },
        { provide: getRepositoryToken(Transaction), useValue: transactionRepo },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('deposit', () => {
    it('should deposit an amount and update the user balance', async () => {
      const user = { id: 1, balance: 100 } as any;
      jest.spyOn(usersService, 'findById').mockResolvedValue(user);
      jest.spyOn(usersService, 'update').mockResolvedValue(user);
      jest.spyOn(transactionRepo, 'save').mockResolvedValue({} as any);

      const result = await service.deposit(1, 50);

      expect(usersService.findById).toHaveBeenCalledWith(1);
      expect(usersService.update).toHaveBeenCalledWith({ ...user, balance: 150 });
      expect(transactionRepo.save).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw an error if the amount is less than or equal to zero', async () => {
      await expect(service.deposit(1, 0)).rejects.toThrow(BadRequestException);
    });
  });

  describe('withdraw', () => {
    it('should withdraw an amount and update the user balance', async () => {
      const user = { id: 1, balance: 100 } as any;
      jest.spyOn(usersService, 'findById').mockResolvedValue(user);
      jest.spyOn(usersService, 'update').mockResolvedValue(user);
      jest.spyOn(transactionRepo, 'save').mockResolvedValue({} as any);

      const result = await service.withdraw(1, 50);

      expect(usersService.findById).toHaveBeenCalledWith(1);
      expect(usersService.update).toHaveBeenCalledWith({ ...user, balance: 50 });
      expect(transactionRepo.save).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw an error if the amount is greater than the balance', async () => {
      const user = { id: 1, balance: 50 } as any;
      jest.spyOn(usersService, 'findById').mockResolvedValue(user);

      await expect(service.withdraw(1, 100)).rejects.toThrow(BadRequestException);
    });
  });

  describe('transfer', () => {
    it('should transfer an amount from sender to receiver', async () => {
      const sender = { id: 1, balance: 100 } as any;
      const receiver = { id: 2, balance: 50 } as any;

      jest.spyOn(usersService, 'findById').mockImplementation((id) =>
        id === 1 ? Promise.resolve(sender) : Promise.resolve(receiver),
      );
      jest.spyOn(usersService, 'update').mockResolvedValue(sender);
      jest.spyOn(transactionRepo, 'save').mockResolvedValue({} as any);

      const result = await service.transfer(1, 2, 50);

      expect(usersService.findById).toHaveBeenCalledWith(1);
      expect(usersService.findById).toHaveBeenCalledWith(2);
      expect(usersService.update).toHaveBeenCalledWith({ ...sender, balance: 50 });
      expect(usersService.update).toHaveBeenCalledWith({ ...receiver, balance: 100 });
      expect(transactionRepo.save).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw an error if the sender has insufficient balance', async () => {
      const sender = { id: 1, balance: 50 } as any;
      const receiver = { id: 2, balance: 50 } as any;

      jest.spyOn(usersService, 'findById').mockImplementation((id) =>
        id === 1 ? Promise.resolve(sender) : Promise.resolve(receiver),
      );

      await expect(service.transfer(1, 2, 100)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getBalance', () => {
    it('should return the user balance', async () => {
      const user = { id: 1, balance: 100 } as any;
      jest.spyOn(usersService, 'findById').mockResolvedValue(user);

      const result = await service.getBalance(1);

      expect(usersService.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual({ balance: 100 });
    });
  });
});
