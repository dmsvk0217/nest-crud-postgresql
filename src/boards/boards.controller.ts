import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatusVaildationPipe } from './pipe/board-status-vaildation.pipe';
import { BoardStatus } from './board-status.enum';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO);
  }

  @Patch('/:id/status')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusVaildationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoard(id, status);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoardById(id);
  }
}
