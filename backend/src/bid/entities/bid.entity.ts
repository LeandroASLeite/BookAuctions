import { Book } from 'src/book/entities/book.entity';
import { GenericEntity } from 'src/generic/entities/generic_entity.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum BidStatus {
  PENDING = 0,
  REJECTED = 1,
  ACCEPTED = 2,
}

@Entity()
export class Bid extends GenericEntity {
  @Column({
    type: 'enum',
    enum: BidStatus,
    default: BidStatus.PENDING,
  })
  status: BidStatus;

  @Column()
  price: string;

  @ManyToOne(() => User, (user) => user.bids)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(
    () => Book,
    (book) => {
      book.bids;
    },
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column()
  bookId: number;
}
