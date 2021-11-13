import * as t from "io-ts";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";

import { CreateUserUseCase } from "../../application/usecase/CreateUserUseCase";
import { ErrorStatus } from "../../error/ErrorStatus";
import { CreateUserInputData } from "../../application/input/CreateUserInputData";

import { Reply, Request } from "./common";

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    this.createUser = this.createUser.bind(this);
  }

  createUser(request: Request): T.Task<Reply> {
    const createUserRequest = t
      .type({
        name: t.string,
      })
      .decode(request.body);

    if (E.isLeft(createUserRequest)) {
      return T.of({
        status: ErrorStatus.BadRequest,
        body: "Invalid body",
      });
    }

    const input: CreateUserInputData = {
      name: createUserRequest.right.name,
    };

    return pipe(
      input,
      this.createUserUseCase.handle,
      T.map((x) => ({
        status: 200,
        body: {
          id: x.id,
          name: x.name,
        },
      }))
    );
  }
}
