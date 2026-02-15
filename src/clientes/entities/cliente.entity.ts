import { Conta } from 'src/contas/entities/conta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ name: 'address', type: 'varchar', length: 255, nullable: false })
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @ManyToMany(() => Conta, (conta) => conta.cliente, { eager: true })
  @JoinTable({ name: 'cliente_titular' })
  contas: Conta[];
}
