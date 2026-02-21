import { Conta } from 'src/contas/entities/conta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transacao {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Conta, (conta) => conta.entradas)
  contaOrigem: Conta;

  @ManyToOne(() => Conta, (conta) => conta.saidas)
  contaDestino?: Conta;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  valor: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  dataHora?: Date;
}
