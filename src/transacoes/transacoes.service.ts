import { Injectable } from '@nestjs/common';
import { CreateTransacoeDto } from './dto/create-transacoe.dto';
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

  async createDeposit(dto: CreateTransacoeDto) {
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
    conta.balance += dto.valor;
    return this.transacaoRepository.save(newTransacao);
  }

  async createSake(dto: CreateTransacoeDto) {
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
    conta.balance -= dto.valor;
    return this.transacaoRepository.save(newTransacao);
  }

  async createTransfer(dto: CreateTransacoeDto) {
    const contaOrigem = await this.contaRepository.findOneBy({
      id: dto.contaOrigemId,
    });
    if (!contaOrigem) {
      throw new Error('Account not found');
    }
    const contaDestino = await this.contaRepository.findOneBy({
      id: dto.contaOrigemId,
    });
    if (!contaDestino) {
      throw new Error('Account not found');
    }
    const newTransacao = this.transacaoRepository.create({
      contaOrigem: contaOrigem,
      contaDestino: contaDestino,
      valor: dto.valor,
    });
    contaOrigem.balance -= dto.valor;
    contaDestino.balance += dto.valor;
    return this.transacaoRepository.save(newTransacao);
  }

  async findOne(id: string) {
    const transacao = await this.transacaoRepository.findOneBy({ id });
    if (!transacao) {
      throw new Error('Transaction not found');
    }
    return transacao;
  }
}
