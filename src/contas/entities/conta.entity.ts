import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Transacao } from 'src/transacoes/entities/transacao.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ManyToOne } from 'typeorm/browser';

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
  accountNumber: string;

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

  @ManyToOne(() => Cliente, (cliente) => cliente.contas)
  cliente: Cliente;

  @OneToMany(() => Transacao, (transacao) => transacao.contaOrigem, {
    eager: true,
    cascade: true,
  })
  entradas: Transacao[];

  @OneToMany(() => Transacao, (transacao) => transacao.contaDestino, {
    eager: true,
    cascade: true,
  })
  saidas: Transacao[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @BeforeInsert()
  generateAccountNumber() {
    this.accountNumber = Math.floor(10000 + Math.random() * 90000).toString();
  }
}
