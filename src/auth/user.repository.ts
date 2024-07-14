import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '235015') {
        throw new ConflictException('Existing username');
      } else {
        throw e;
      }
    }
  }
}

// {
//     "name": "InternalServerErrorException",
//     "statusCode": 500,
//     "message": "Internal Server Error",
//     "timestamp": "2024-07-14T11:43:01.803Z",
//     "path": "/auth/signup"
// }

// {
//     "statusCode": 500,
//     "timestamp": "2024-07-14T11:43:17.635Z",
//     "path": "/auth/signup",
//     "message": "duplicate key value violates unique constraint \"UQ_78a916df40e02a9deb1c4b75edb\""
// }
