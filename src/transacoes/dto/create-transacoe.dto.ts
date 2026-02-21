import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateTransacoeDto {
  @ApiProperty({ description: 'Id da conta origem da transação' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contaOrigemId: string;

  @ApiProperty({ description: 'Id da conta destino da transação' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  contaDestinoId?: string;

  @ApiProperty({ description: 'Valor em R$ da transação' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  valor: number;
}
