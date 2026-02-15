import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repository: Repository<Cliente>,
  ) {}

  create(dto: CreateClienteDto) {
    const cliente = this.repository.create(dto);
    return this.repository.save(cliente);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateClienteDto) {
    const cliente = await this.repository.findOneBy({ id });
    if (!cliente) {
      return null;
    }
    this.repository.merge(cliente, dto);
    return this.repository.save(cliente);
  }

  async remove(id: string) {
    const cliente = await this.repository.findOneBy({ id });
    if (!cliente) {
      return null;
    }
    return this.repository.remove(cliente);
  }
}
