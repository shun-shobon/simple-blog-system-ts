import { fastify } from "fastify";
import { PrismaClient } from "@prisma/client";

import { setupRoute } from "./infrastructure/http/route";

const prisma = new PrismaClient();

async function main() {
  const server = fastify({ logger: true });

  setupRoute(server, prisma);

  await server.listen(3000);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
