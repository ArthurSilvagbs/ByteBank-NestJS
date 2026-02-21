import { Injectable } from '@nestjs/common';
import { CreateTransacoeDto } from './dto/create-transacoe.dto';
import { UpdateTransacoeDto } from './dto/update-transacoe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transacao } from './entities/transacao.entity';
import { Repository } from 'typeorm';
import { Conta } from 'src/contas/entities/conta.entity';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
  ) {}

  async create(dto: CreateTransacoeDto) {
    const conta = await this.contaRepository.findOneBy({
      id: dto.contaOrigemId,
    });
    if (!conta) {
      throw new Error('Account not found');
    }
    const newTransacao = this.transacaoRepository.create({
      contaOrigem: conta,
      valor: dto.valor,
    });
    return this.transacaoRepository.save(newTransacao);
  }

  findAll() {
    return this.transacaoRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #{id} transacoe`;
  }

  update(id: string, dto: UpdateTransacoeDto) {
    return `This action updates a #{id} transacoe`;
  }

  remove(id: string) {
    return `This action removes a #{id} transacoe`;
  }
}
