import * as O from "fp-ts/Option";
import * as T from "fp-ts/Task";

import { PrismaClient } from "@prisma/client";

import { User } from "../../domain/entity/User";

import { UserRepository } from "../../application/repository/UserRepository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  save(user: User): T.Task<User> {
    return () =>
      this.prisma.user
        .create({
          data: {
            name: user.name,
          },
        })
        .then((u) => ({ id: O.some(u.id), name: u.name }));
  }
}
