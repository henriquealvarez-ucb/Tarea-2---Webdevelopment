import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Categoria } from '../../jugadores/jugador.entity.js';
import { Cancha, EstadoPartido } from '../partido.entity.js';

export class CreatePartidoDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'hora debe tener formato HH:mm' })
  hora: string;

  @IsEnum(Cancha)
  cancha: Cancha;

  @IsEnum(Categoria)
  categoria: Categoria;

  @IsOptional()
  @IsEnum(EstadoPartido)
  estado?: EstadoPartido;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(16)
  tantosEquipo1?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(16)
  tantosEquipo2?: number;

  @IsInt()
  equipo1Jugador1Id: number;

  @IsInt()
  equipo1Jugador2Id: number;

  @IsInt()
  equipo2Jugador1Id: number;

  @IsInt()
  equipo2Jugador2Id: number;
}
