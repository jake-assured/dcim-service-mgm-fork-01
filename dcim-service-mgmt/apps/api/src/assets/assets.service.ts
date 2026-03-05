import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OwnerType } from "@prisma/client";

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  listForClient(clientId: string) {
    // for INTERNAL assets we allow visibility across tenant? MVP scopes to tenant only.
    return this.prisma.asset.findMany({
      where: {
        OR: [
          { ownerType: OwnerType.INTERNAL },
          { ownerType: OwnerType.CLIENT, clientId }
        ]
      },
      orderBy: { updatedAt: "desc" }
    });
  }

  async create(dto: any, requesterClientId: string) {
    if (dto.ownerType === OwnerType.CLIENT && !dto.clientId) {
      // If owner=CLIENT, must link to a client
      throw new BadRequestException("clientId is required when ownerType is CLIENT.");
    }

    // Enforce that non-admin cannot create assets for other clients (MVP simplification)
    if (dto.ownerType === OwnerType.CLIENT && dto.clientId !== requesterClientId) {
      throw new BadRequestException("Cannot create client-owned asset for a different client (MVP).");
    }

    return this.prisma.asset.create({
      data: {
        assetTag: dto.assetTag,
        name: dto.name,
        assetType: dto.assetType,
        ownerType: dto.ownerType,
        clientId: dto.ownerType === OwnerType.CLIENT ? dto.clientId : null,
        location: dto.location
      }
    });
  }
}
