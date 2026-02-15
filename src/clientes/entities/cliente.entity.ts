import {
  Column,
  CreateDateColumn,
  Entity,
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
}
