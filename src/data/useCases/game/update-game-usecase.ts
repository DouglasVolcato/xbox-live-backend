import { ProfileDto } from 'src/domain/dtos/profile-dto';
import { UpdateGameUseCaseInterface } from 'src/data/abstract/game/update-game-interface';
import { GameRepositoryInterface } from 'src/infra/repositories/abstract/game-repository-interface';

export class UpdateGameUseCase implements UpdateGameUseCaseInterface {
  constructor(private readonly repository: GameRepositoryInterface) {}

  async execute(body: ProfileDto, id: string): Promise<boolean> {
    const foundGame = await this.repository.getOne(id);
    if (foundGame) {
      const updatedBody = Object.assign(foundGame, body);
      const updatedGame = await this.repository.update(updatedBody, id);
      switch (updatedGame) {
        case updatedGame:
          return true;
        default:
          return false;
      }
    } else {
      return false;
    }
  }
}