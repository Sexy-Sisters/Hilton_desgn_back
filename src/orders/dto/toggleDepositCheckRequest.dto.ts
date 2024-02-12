import { IsBoolean, IsNotEmpty } from "class-validator";

export class ToggleDepositCheckRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  depositCheckRequestStatus: boolean;
}
  