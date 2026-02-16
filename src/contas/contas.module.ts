import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from './entities/conta.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conta, Cliente])],
  controllers: [ContasController],
  providers: [ContasService],
})
export class ContasModule {}
