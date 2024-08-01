import { Bid } from 'src/bid/entities/bid.entity';
import { GenericEntity } from 'src/generic/entities/generic_entity.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export enum BookStatus {
  PENDING = 0,
  AT_AUCTION = 1,
  SOLD = 2,
}

@Entity()
export class Book extends GenericEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @Column()
  imageURL: string;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.PENDING,
  })
  status: BookStatus;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Bid, (bid) => bid.book)
  bids: Bid[];
}
