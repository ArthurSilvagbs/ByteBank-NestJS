import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Contas')
@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @ApiOperation({ summary: 'Criar uma nova conta' })
  @ApiCreatedResponse({ description: 'A conta foi criada com sucesso.' })
  @ApiBadRequestResponse({
    description: 'Dados inválidos para criação da conta.',
  })
  @Post()
  create(@Body() dto: CreateContaDto) {
    return this.contasService.create(dto);
  }

  @ApiOperation({ summary: 'Listar todas as contas' })
  @ApiOkResponse({ description: 'Lista de contas retornada com sucesso.' })
  @ApiNotFoundResponse({ description: 'Nenhuma conta encontrada.' })
  @Get()
  async findAll() {
    return this.contasService.findAll();
  }

  @ApiOperation({ summary: 'Buscar conta por ID' })
  @ApiOkResponse({ description: 'Conta encontrada com sucesso.' })
  @ApiNotFoundResponse({ description: 'Conta não encontrada.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const conta = await this.contasService.findOne(id);
    if (!conta) {
      throw new Error('Account not found');
    }
    return conta;
  }

  @ApiOperation({ summary: 'Atualizar uma conta existente' })
  @ApiOkResponse({ description: 'Conta atualizada com sucesso.' })
  @ApiBadRequestResponse({
    description: 'Dados inválidos para atualização da conta.',
  })
  @ApiNotFoundResponse({ description: 'Conta não encontrada.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateContaDto) {
    const conta = await this.contasService.findOne(id);
    if (!conta) {
      throw new Error('Account not found');
    }
    return this.contasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const conta = await this.contasService.remove(id);
    if (!conta) throw new NotFoundException();
  }
}
