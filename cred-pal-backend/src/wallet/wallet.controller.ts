import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Wallet')
@ApiBearerAuth()
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @ApiOperation({ summary: 'Get wallet balance' })
  @ApiResponse({ status: 200, description: 'Wallet balance retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  @Get('balance')
  async getBalance(@Request() req) {
    return { balance: await this.walletService.getBalance(req.user.sub) };
  }

  @ApiOperation({ summary: 'Fund wallet' })
  @ApiResponse({ status: 200, description: 'Wallet funded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  @Post('fund')
  async fundWallet(@Request() req, @Body() body: { amount: number }) {
    return {
      newBalance: await this.walletService.fundWallet(req.user.sub, body.amount),
    };
  }
}
