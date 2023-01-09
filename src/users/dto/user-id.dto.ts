import { IsUUID } from "class-validator";

export class UserIdDto {
  @IsUUID("all")
  userId: string;
}
