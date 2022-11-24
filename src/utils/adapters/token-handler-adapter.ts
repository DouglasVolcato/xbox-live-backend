import { TokenHandlerInterface } from '../abstract/token-handler-interface';
import * as jwt from 'jsonwebtoken';
import { GetOneUserByIdUseCase } from 'src/data/useCases/user/getOne-user-byId-usecase';
import { UserRepository } from 'src/infra/repositories/user-repository';

export class TokenHandlerAdapter implements TokenHandlerInterface {
  generateToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.SECRET, {
      expiresIn: 86400,
    });
  }

  validateToken(token: string): void {
    const teste = jwt.verify(
      token,
      process.env.SECRET,
      async (error, decoded: { id: string }) => {
        try {
          if (error) {
            throw new Error('Invalid token.');
          }

          const userRepository = new UserRepository();
          const getUserByIdUseCase = new GetOneUserByIdUseCase(userRepository);
          const user = await getUserByIdUseCase.execute(decoded.id);

          if (!user || !user.id) {
            throw new Error('Invalid token.');
          }

          return;
        } catch (error) {
          throw new Error('Invalid token.');
        }
      },
    );
    return teste;
  }
}