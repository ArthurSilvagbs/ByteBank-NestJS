import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiCreatedResponse({ description: 'O cliente foi criado com sucesso.' })
  @ApiBadRequestResponse({
    description: 'Dados inválidos para criar o cliente.',
  })
  @ApiConflictResponse({ description: 'O cliente já existe.' })
  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clientesService.create(dto);
  }

  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiOkResponse({ description: 'Lista de clientes retornada com sucesso.' })
  @ApiNotFoundResponse({ description: 'Nenhum cliente encontrado.' })
  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @ApiOperation({ summary: 'Obter um cliente por ID' })
  @ApiOkResponse({ description: 'Cliente encontrado e retornado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um cliente por ID' })
  @ApiOkResponse({ description: 'Cliente atualizado com sucesso.' })
  @ApiBadRequestResponse({
    description: 'Dados inválidos para atualizar o cliente.',
  })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClienteDto) {
    return this.clientesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Atualizar um cliente por ID' })
  @ApiNoContentResponse({ description: 'Cliente deletado com sucesso.' })
  @ApiBadRequestResponse({
    description: 'Dados inválidos para atualizar o cliente.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(id);
  }
}
