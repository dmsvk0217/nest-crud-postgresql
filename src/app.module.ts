import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
  providers: [CatsService],
})
export class AppModule {}
