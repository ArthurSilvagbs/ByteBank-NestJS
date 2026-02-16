import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ContaStatus } from '../entities/conta.entity';

export class CreateContaDto {
  @ApiProperty({ description: 'ID do cliente titular da conta' })
  @IsUUID()
  @IsNotEmpty()
  clienteId: string;

  @ApiProperty({ enum: ContaStatus, default: ContaStatus.UNLOCKED })
  @IsOptional()
  @IsEnum(ContaStatus)
  status?: ContaStatus;
}
