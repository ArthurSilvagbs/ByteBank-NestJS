import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conta } from './entities/conta.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Transacao } from 'src/transacoes/entities/transacao.entity';

@Injectable()
export class ContasService {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
  ) {}

  async create(dto: CreateContaDto) {
    const cliente = await this.clienteRepository.findOneBy({
      id: dto.clienteId,
    });
    if (!cliente) {
      throw new Error('Client not found');
    }
    const newConta = this.contaRepository.create({ cliente: cliente });
    return this.contaRepository.save(newConta);
  }

  findAll() {
    return this.contaRepository.find();
  }

  async findOne(id: string) {
    const conta = await this.contaRepository.findOneBy({ id });
    if (!conta) {
      throw new Error('Account not found');
    }
    return conta;
  }

  async findTrasactions(id: string) {
    return await this.transacaoRepository.find({
      where: {
        contaOrigem: { id: id },
      },
      relations: ['contaOrigem', 'contaDestino'],
    });
  }

  async update(id: string, dto: UpdateContaDto) {
    const conta = await this.contaRepository.findOneBy({ id });
    if (!conta) {
      throw new Error('Account not found');
    }
    this.contaRepository.merge(conta, dto);
    return this.contaRepository.save(conta);
  }

  async remove(id: string) {
    const conta = await this.contaRepository.findOneBy({ id });
    if (!conta) {
      throw new Error('Account not found');
    }
    return this.contaRepository.remove(conta);
  }
}
