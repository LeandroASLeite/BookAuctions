import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/book/book.module';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';
import { Bid } from './entities/bid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bid]), BookModule],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
