import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categoria, Jugador } from '../jugadores/jugador.entity.js';

export enum Cancha {
  CANCHA_1 = 'cancha-1',
  CANCHA_2 = 'cancha-2',
  CANCHA_CUBIERTA = 'cancha-cubierta',
}

export enum EstadoPartido {
  PROGRAMADO = 'programado',
  JUGADO = 'jugado',
  CANCELADO = 'cancelado',
}

@Entity('partidos')
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'enum', enum: Cancha })
  cancha: Cancha;

  @Column({ type: 'enum', enum: Categoria })
  categoria: Categoria;

  @Column({
    type: 'enum',
    enum: EstadoPartido,
    default: EstadoPartido.PROGRAMADO,
  })
  estado: EstadoPartido;

  @Column({ name: 'tantos_equipo1', type: 'int', nullable: true })
  tantosEquipo1: number | null;

  @Column({ name: 'tantos_equipo2', type: 'int', nullable: true })
  tantosEquipo2: number | null;

  @ManyToOne(() => Jugador, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'equipo1_jugador1_id' })
  equipo1Jugador1: Jugador;

  @ManyToOne(() => Jugador, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'equipo1_jugador2_id' })
  equipo1Jugador2: Jugador;

  @ManyToOne(() => Jugador, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'equipo2_jugador1_id' })
  equipo2Jugador1: Jugador;

  @ManyToOne(() => Jugador, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'equipo2_jugador2_id' })
  equipo2Jugador2: Jugador;
}
