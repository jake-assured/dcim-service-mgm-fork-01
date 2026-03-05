import { Module } from "@nestjs/common";
import { SurveysController } from "./surveys.controller";
import { SurveysService } from "./surveys.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";

@Module({
  controllers: [SurveysController],
  providers: [
    SurveysService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class SurveysModule {}
