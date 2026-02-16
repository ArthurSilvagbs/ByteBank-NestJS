import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Client ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString({ message: 'The id must be a string' })
  @IsNotEmpty({ message: 'The id field is required' })
  @MaxLength(100, { message: 'The id must be at most 255 characters long' })
  id?: string;

  @ApiProperty({
    description: 'Client CPF (11 digits)',
    example: '12345678901',
  })
  @IsString({ message: 'The cpf must be a string' })
  @IsNotEmpty({ message: 'The cpf field is required' })
  @MaxLength(11, { message: 'The cpf must be at most 11 characters long' })
  cpf: string;

  @ApiProperty({
    description: 'Client name',
    example: 'João Silva',
  })
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty({ message: 'The name field is required' })
  @MaxLength(255, { message: 'The name must be at most 255 characters long' })
  name: string;

  @ApiProperty({
    description: 'Client email',
    example: 'joao.silva@example.com',
  })
  @IsString({ message: 'The email must be a string' })
  @IsNotEmpty({ message: 'The email field is required' })
  @MaxLength(255, { message: 'The email must be at most 255 characters long' })
  @IsEmail({}, { message: 'The email must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Client phone number',
    example: '+55 11 91234-5678',
  })
  @IsString({ message: 'The phone must be a string' })
  @IsNotEmpty({ message: 'The phone field is required' })
  @MaxLength(20, { message: 'The phone must be at most 20 characters long' })
  @IsPhoneNumber('BR', {
    message: 'The phone must be a valid Brazilian phone number',
  })
  phone: string;

  @ApiProperty({
    description: 'Client address',
    example: 'Rua das Flores, 123, São Paulo, SP',
  })
  @IsString({ message: 'The address must be a string' })
  @IsNotEmpty({ message: 'The address field is required' })
  @MaxLength(255, {
    message: 'The address must be at most 255 characters long',
  })
  address: string;
}
