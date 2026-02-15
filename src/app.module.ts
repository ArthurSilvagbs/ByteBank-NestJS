import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { ContasModule } from './contas/contas.module';
import { TransacoesModule } from './transacoes/transacoes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Conta } from './contas/entities/conta.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Transacao } from './transacoes/entities/transacoe.entity';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: false,
      migrations: [__dirname + '/database/migrations/*{.js,.ts}'],
      entities: [Conta, Cliente, Transacao],
    }),
    ClientesModule,
    ContasModule,
    TransacoesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
