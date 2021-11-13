import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import * as T from "fp-ts/Task";

import { CreateUserInteractor } from "../../application/interactor/CreateUserInteractor";

import { Reply, Request } from "../../adapter/controller/common";
import { UserController } from "../../adapter/controller/UserController";

import { PrismaUserRepository } from "../repository/PrismaUserRepository";

function adoptController(
  func: (request: Request) => T.Task<Reply>
): (request: FastifyRequest, reply: FastifyReply) => Promise<void> {
  return async (request, reply) => {
    const { status, body } = await func(request)();
    await reply.status(status).send(body);
  };
}

export function setupRoute(fastify: FastifyInstance, prisma: PrismaClient) {
  const userRepository = new PrismaUserRepository(prisma);
  const userInteractor = new CreateUserInteractor(userRepository);
  const userController = new UserController(userInteractor);

  fastify.post("/user", adoptController(userController.createUser));
}
