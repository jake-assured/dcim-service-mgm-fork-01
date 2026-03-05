import { IsOptional, IsString } from "class-validator";

export class CreateSurveyDto {
  @IsString()
  title!: string;

  @IsString()
  surveyType!: string;

  @IsOptional()
  scheduledAt?: string;
}
