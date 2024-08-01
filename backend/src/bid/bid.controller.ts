import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('bids')
@ApiBearerAuth()
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @ApiOperation({ summary: 'Cria um Lance.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidService.create(createBidDto);
  }

  @ApiOperation({ summary: 'Deleta um Lance.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bidService.delete(id);
  }

  @ApiOperation({ summary: 'Aceita um Lance e cancela os outros.' })
  @HttpCode(HttpStatus.OK)
  @Post('accept/:id')
  accept(@Param('id') id: number) {
    return this.bidService.accept(id);
  }

  @ApiOperation({ summary: 'Rejeita um Lance.' })
  @HttpCode(HttpStatus.OK)
  @Post('reject/:id')
  reject(@Param('id') id: number) {
    return this.bidService.reject(id);
  }

  @ApiOperation({ summary: 'Busca um lance por "userId" ou por "bookId.' })
  @ApiQuery({ name: 'bookId', required: false })
  @ApiQuery({ name: 'userId', required: false })
  @HttpCode(HttpStatus.OK)
  @Get()
  findBy(@Query('bookId') bookId: number, @Query('userId') userid?: number) {
    if (bookId) return this.bidService.findByBook(bookId);
    if (userid) return this.bidService.findByUser(userid);
  }
}
