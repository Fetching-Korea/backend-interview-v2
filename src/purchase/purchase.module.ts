import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaService]
})
export class PurchaseModule {}
