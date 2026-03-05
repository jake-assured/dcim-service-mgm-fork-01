import { Module } from "@nestjs/common";
import { AssetsController } from "./assets.controller";
import { AssetsService } from "./assets.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";

@Module({
  controllers: [AssetsController],
  providers: [
    AssetsService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AssetsModule {}
