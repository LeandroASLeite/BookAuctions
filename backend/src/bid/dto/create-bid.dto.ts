import { IsCurrency, IsNumber } from 'class-validator';

export class CreateBidDto {
  @IsNumber()
  bookId: number;

  @IsCurrency()
  price: string;
}
