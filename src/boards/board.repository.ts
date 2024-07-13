import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    const { title, description } = createBoardDTO;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);

    return board;
  }
}
