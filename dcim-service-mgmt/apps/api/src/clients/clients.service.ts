import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.client.findMany({ orderBy: { name: "asc" } });
  }

  get(id: string) {
    return this.prisma.client.findUnique({ where: { id } });
  }
}
