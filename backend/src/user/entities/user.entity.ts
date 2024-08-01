import { Bid } from 'src/bid/entities/bid.entity';
import { Book } from 'src/book/entities/book.entity';
import { GenericEntity } from 'src/generic/entities/generic_entity.entity';
import { encrypt } from 'src/services/encrypt.service';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends GenericEntity {
  constructor(id: number = null) {
    super();
    id ? (this.id = id) : null;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    this.password = await encrypt(this.password);
  }
}
