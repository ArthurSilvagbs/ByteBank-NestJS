import { Cliente } from 'src/clientes/entities/cliente.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Cliente, (cliente) => cliente.contas)
  cliente: Cliente[];

  @BeforeInsert()
  generateAccountNumber() {
    this.number = Math.floor(10000 + Math.random() * 90000).toString();
  }
}
