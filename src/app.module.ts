import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { ContasModule } from './contas/contas.module';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [ClientesModule, ContasModule, TransacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
