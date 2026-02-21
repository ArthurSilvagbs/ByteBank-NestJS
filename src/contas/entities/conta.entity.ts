import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Transacao } from 'src/transacoes/entities/transacao.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ContaStatus {
  UNLOCKED = 'unlocked',
  BLOCKED = 'blocked',
}
@Entity()
export class Conta {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    name: 'number',
    type: 'varchar',
    length: 5,
    nullable: false,
    unique: true,
  })
  number: string;

  @Column({
    name: 'balance',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  balance: number;

  @Column({
    type: 'enum',
    enum: ContaStatus,
    default: ContaStatus.UNLOCKED,
  })
  status?: ContaStatus;

  @ManyToMany(() => Cliente, (cliente) => cliente.contas)
  cliente: Cliente;

  @OneToMany(() => Transacao, (transacao) => transacao.conta, {
    eager: true,
    cascade: true,
  })
  transacoes: Transacao[];

  @BeforeInsert()
  generateAccountNumber() {
    this.number = Math.floor(10000 + Math.random() * 90000).toString();
  }
}
