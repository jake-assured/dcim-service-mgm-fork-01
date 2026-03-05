import { IsOptional, IsString } from "class-validator";

export class CreateServiceRequestDto {
  @IsString()
  subject!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  priority?: string;
}

export class CloseServiceRequestDto {
  @IsString()
  closureSummary!: string;
}
