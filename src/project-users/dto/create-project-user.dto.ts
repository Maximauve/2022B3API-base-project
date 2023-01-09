import { IsDate, IsNotEmpty, IsUUID } from "class-validator";

export class CreatePUserDto {
  
  @IsNotEmpty()
  public startDate: Date;

  @IsNotEmpty()
  public endDate: Date;

  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @IsNotEmpty()
  @IsUUID()
  public projectId: string;
}
