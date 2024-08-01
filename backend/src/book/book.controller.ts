import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('books')
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Cria um Livro.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() CreateBookDto: CreateBookDto) {
    return this.bookService.create(CreateBookDto);
  }

  @ApiOperation({ summary: 'Edita um Livro.' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  edit(@Param('id') id: number, @Body() updateBookDTO: UpdateBookDto) {
    return this.bookService.edit(updateBookDTO, id);
  }

  @ApiOperation({ summary: 'Deleta um Livro.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }

  @ApiOperation({ summary: 'Procura um Livro e os Lances pelo "userId".' })
  @ApiQuery({ name: 'userId', required: true })
  @HttpCode(HttpStatus.OK)
  @Get('/bids')
  findBooksWithBids(
    @Query('userId') userId?: number,
    @Query('bookId') bookId?: number,
  ) {
    if (userId && !bookId) return this.bookService.findBooksWithBids(userId);
    if (userId && bookId)
      return this.bookService.findBooksWithBidsAndBook(userId, bookId);
  }
  @ApiOperation({ summary: 'Procura um Livro pelo "userId".' })
  @ApiQuery({ name: 'userId', required: false })
  @HttpCode(HttpStatus.OK)
  @Get()
  findBy(
    @Query('userId') userId?: number,
    @Query('withBids') withBids?: boolean,
  ) {
    if (userId) return this.bookService.findByUser(userId, withBids);
    return this.bookService.findAll();
  }

  @ApiOperation({ summary: 'Procura um Livro por id.' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.bookService.findById(id);
  }
}
