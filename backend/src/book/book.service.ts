import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async create(createBookDto: CreateBookDto) {
    return await this.booksRepository.save({
      ...createBookDto,
      userId: this.request['user'].id,
    });
  }

  async edit(updateBookDTO: UpdateBookDto, id: number) {
    return await this.booksRepository.update({ id }, updateBookDTO);
  }

  async delete(id: number) {
    const bookToDelete = await this.booksRepository.findBy({ id });
    return await this.booksRepository.remove(bookToDelete);
  }
  async findByUser(userId: number, withBids?: boolean) {
    if (withBids)
      return await this.booksRepository.find({
        where: { userId: userId },
        relations: ['bids'],
      });
    return await this.booksRepository.findBy({ userId });
  }
  async findAll() {
    return await this.booksRepository.find();
  }
  async findById(id: number) {
    return await this.booksRepository.findBy({ id });
  }

  async findBooksWithBids(userId: number) {
    return await this.booksRepository.find({
      relations: ['bids'],
      where: { bids: { userId: userId } },
    });
  }
  async findBooksWithBidsAndBook(userId: number, id: number) {
    const foundBook = await this.booksRepository.findOne({
      where: { id },
      relations: ['bids'],
    });
    foundBook.bids = foundBook.bids.filter((bid) => bid.userId == userId);
    return foundBook;
  }
}
