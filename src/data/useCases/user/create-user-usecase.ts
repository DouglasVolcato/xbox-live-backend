import { UserDto } from 'src/domain/dtos/user-dto';
import { UserRepositoryInterface } from 'src/infra/repositories/abstract/user-repository-interface';
import { CreateUserUseCaseInterface } from 'src/data/useCases/abstract/user/create-user-interface';
import { UserEntity } from 'src/entities/user-entity';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(body: UserDto): Promise<boolean> {
    const userBody = new UserEntity(body);
    userBody.validateBody();

    const createdUser = await this.repository.create(userBody.getBody());
    switch (createdUser) {
      case createdUser:
        return true;
      default:
        return false;
    }
  }
}