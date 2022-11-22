import { Game } from '../entities/game-entity';
import { Profile } from '../entities/profile-entity';
import { User } from '../entities/user-entity';

export interface BodyHandler {
  validateBody(): Promise<boolean>;
  getBody(): Promise<Game | User | Profile>;
}