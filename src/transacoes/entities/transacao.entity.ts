import decimal from 'decimal.js';
import { Conta } from 'src/contas/entities/conta.entity';
import { Entity } from 'typeorm';

@Entity()
export class Transacao {
  id: string;
  contaOrigem: Conta;
  contaDestino: Conta;
  valor: decimal;
  createdAt: string;
  conta: Conta;
}
