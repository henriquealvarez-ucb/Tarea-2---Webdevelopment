import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Categoria, EstadoJugador, Mano } from '../jugador.entity.js';

export class CreateJugadorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsEnum(Categoria)
  categoria: Categoria;

  @IsOptional()
  @IsEnum(EstadoJugador)
  estado?: EstadoJugador;

  @IsOptional()
  @IsEnum(Mano)
  mano?: Mano;
}
