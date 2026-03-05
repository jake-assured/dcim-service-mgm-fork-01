import { IsEnum, IsOptional, IsString } from "class-validator";
import { OwnerType } from "@prisma/client";

export class CreateAssetDto {
  @IsString()
  assetTag!: string;

  @IsString()
  name!: string;

  @IsString()
  assetType!: string;

  @IsEnum(OwnerType)
  ownerType!: OwnerType;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
