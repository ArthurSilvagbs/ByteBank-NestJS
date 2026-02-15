import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Conta } from 'src/contas/entities/conta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Conta])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
