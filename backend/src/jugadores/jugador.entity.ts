import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Categoria {
  PRIMERA = 'primera',
  SEGUNDA = 'segunda',
  TERCERA = 'tercera',
  INFANTIL = 'infantil',
}

export enum EstadoJugador {
  ACTIVO = 'activo',
  LESIONADO = 'lesionado',
  INACTIVO = 'inactivo',
}

export enum Mano {
  DIESTRA = 'diestra',
  ZURDA = 'zurda',
}

@Entity('jugadores')
export class Jugador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column({ type: 'date', name: 'fecha_nacimiento', nullable: true })
  fechaNacimiento: string | null;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  telefono: string | null;

  @Column({ type: 'enum', enum: Categoria })
  categoria: Categoria;

  @Column({ type: 'enum', enum: EstadoJugador, default: EstadoJugador.ACTIVO })
  estado: EstadoJugador;

  @Column({ type: 'enum', enum: Mano, default: Mano.DIESTRA })
  mano: Mano;
}
