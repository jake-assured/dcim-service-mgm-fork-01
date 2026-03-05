import { Controller, Get, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ClientsService } from "./clients.service";
import { Roles } from "../auth/roles.decorator";
import { Role } from "@prisma/client";

@ApiTags("clients")
@ApiBearerAuth()
@Controller("clients")
export class ClientsController {
  constructor(private clients: ClientsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SERVICE_MANAGER, Role.SERVICE_DESK_ANALYST)
  async list(@Req() req: any) {
    // Admin/SM/SDA can see all clients (MVP). Refine later.
    return this.clients.list();
  }
}
