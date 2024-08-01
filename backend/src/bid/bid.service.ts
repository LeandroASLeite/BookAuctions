import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBidDto } from './dto/create-bid.dto';
import { Bid } from './entities/bid.entity';
import { BookService } from 'src/book/book.service';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>,
    @Inject(REQUEST)
    private readonly request: Request,
    private booksService: BookService,
  ) {}

  async create(createBidDto: CreateBidDto) {
    return await this.bidsRepository.save({
      ...createBidDto,
      userId: this.request['user'].id,
    });
  }

  async delete(id: number) {
    const userToDelete = await this.bidsRepository.findOneBy({ id });
    return await this.bidsRepository.remove([userToDelete]);
  }

  async accept(id: number) {
    const bid = await this.bidsRepository.findOneBy({ id });
    await this.bidsRepository.update({ id }, { status: 2 });
    await this.bidsRepository.update(
      { bookId: bid.bookId, status: 0 },
      { status: 1 },
    );
  }

  async reject(id: number) {
    return await this.bidsRepository.update({ id }, { status: 1 });
  }

  async findByBook(bookId: number) {
    return await this.bidsRepository.findBy({ bookId });
  }
  async findByUser(userId: number) {
    return await this.bidsRepository.findBy({ userId });
  }
}
