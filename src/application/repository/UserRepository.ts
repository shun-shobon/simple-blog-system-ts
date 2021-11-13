import * as T from "fp-ts/Task";

import { User } from "../../domain/entity/User";

export interface UserRepository {
  save(user: User): T.Task<User>;
}
