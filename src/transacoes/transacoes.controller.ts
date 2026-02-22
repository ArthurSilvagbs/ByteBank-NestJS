import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { CreateTransacoeDto } from './dto/create-transacoe.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Transacoes')
@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @ApiOperation({ summary: 'Efetuar uma novo deposito.' })
  @ApiCreatedResponse({ description: 'Deposito efetuada com sucesso.' })
  @ApiBadRequestResponse({
    description: 'Dados inseridos são inválidos',
  })
  @Post()
  deposit(@Body() createTransacoeDto: CreateTransacoeDto) {
    return this.transacoesService.createDeposit(createTransacoeDto);
  }

  @ApiOperation({ summary: 'Efetuar uma nova saque.' })
  @ApiCreatedResponse({ description: 'Saque efetuada com sucesso.' })
  @ApiBadRequestResponse({
    description: 'Dados inseridos são inválidos',
  })
  @Post()
  sake(@Body() createTransacoeDto: CreateTransacoeDto) {
    return this.transacoesService.createSake(createTransacoeDto);
  }

  @ApiOperation({ summary: 'Efetuar uma nova transferência.' })
  @ApiCreatedResponse({ description: 'Transferência efetuada com sucesso.' })
  @ApiBadRequestResponse({
    description: 'Dados inseridos são inválidos',
  })
  @Post()
  transfer(@Body() createTransacoeDto: CreateTransacoeDto) {
    return this.transacoesService.createTransfer(createTransacoeDto);
  }

  @ApiOperation({ summary: 'Consultar uma transação especifica por ID.' })
  @ApiOkResponse({ description: 'Transação encontrada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Transação não encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacoesService.findOne(id);
  }
}
