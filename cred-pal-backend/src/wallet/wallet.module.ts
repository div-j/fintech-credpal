import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Make User repository available
    UsersModule, // Import UsersModule to access UsersService if needed
  ],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
