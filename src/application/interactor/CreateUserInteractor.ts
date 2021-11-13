import * as O from "fp-ts/Option";
import * as T from "fp-ts/Task";
import { pipe } from "fp-ts/function";

import { CreateUserUseCase } from "../usecase/CreateUserUseCase";
import { CreateUserInputData } from "../input/CreateUserInputData";
import { CreateUserOutputData } from "../output/CreateUserOutputData";
import { UserRepository } from "../repository/UserRepository";

import { AppError } from "../../error/AppError";

export class CreateUserInteractor implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.handle = this.handle.bind(this);
  }

  handle(inputData: CreateUserInputData): T.Task<CreateUserOutputData> {
    return pipe(
      this.userRepository.save({ id: O.none, name: inputData.name }),
      T.map((user) => {
        const unwrap = O.getOrElseW(() => {
          throw new AppError("User must have id");
        });

        return {
          id: unwrap(user.id),
          name: user.name,
        };
      })
    );
  }
}
