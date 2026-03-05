import { IsEnum, IsOptional, IsString } from "class-validator";
import { SurveyItemResponse } from "@prisma/client";

export class CreateSurveyDto {
  @IsString()
  title!: string;

  @IsString()
  surveyType!: string;

  @IsOptional()
  scheduledAt?: string;
}

export class AddSurveyItemDto {
  @IsString()
  label!: string;
}

export class UpdateSurveyItemDto {
  @IsOptional()
  @IsEnum(SurveyItemResponse)
  response?: SurveyItemResponse;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  photoObjectKey?: string;
}
