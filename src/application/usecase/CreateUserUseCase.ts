import * as T from "fp-ts/Task";

import { CreateUserInputData } from "../input/CreateUserInputData";
import { CreateUserOutputData } from "../output/CreateUserOutputData";

export interface CreateUserUseCase {
  handle(inputData: CreateUserInputData): T.Task<CreateUserOutputData>;
}
