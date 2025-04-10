import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit/:userId')
  async deposit(@Param('userId') userId: number, @Body('amount') amount: number) {
    return this.transactionsService.deposit(userId, amount);
  }

  @Post('withdraw/:userId')
  async withdraw(@Param('userId') userId: number, @Body('amount') amount: number) {
    return this.transactionsService.withdraw(userId, amount);
  }

  @Post('transfer/:senderId/:receiverId')
  async transfer(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
    @Body('amount') amount: number,
  ) {
    return this.transactionsService.transfer(senderId, receiverId, amount);
  }

  @Get('balance/:userId')
  async getBalance(@Param('userId') userId: number) {
    return this.transactionsService.getBalance(userId);
  }
}
