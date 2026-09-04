import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria, EstadoJugador, Jugador, Mano } from './jugador.entity.js';

const JUGADORES_DEMO: Partial<Jugador>[] = [
  {
    nombre: 'Juan',
    apellidos: 'Pérez',
    email: 'juan.perez@clubfronton.com',
    categoria: Categoria.PRIMERA,
    estado: EstadoJugador.ACTIVO,
    mano: Mano.DIESTRA,
  },
  {
    nombre: 'Ana',
    apellidos: 'García',
    email: 'ana.garcia@clubfronton.com',
    categoria: Categoria.SEGUNDA,
    estado: EstadoJugador.ACTIVO,
    mano: Mano.ZURDA,
  },
  {
    nombre: 'Carlos',
    apellidos: 'Rodríguez',
    email: 'carlos.rodriguez@clubfronton.com',
    categoria: Categoria.TERCERA,
    estado: EstadoJugador.ACTIVO,
    mano: Mano.DIESTRA,
  },
  {
    nombre: 'María',
    apellidos: 'López',
    email: 'maria.lopez@clubfronton.com',
    categoria: Categoria.INFANTIL,
    estado: EstadoJugador.ACTIVO,
    mano: Mano.ZURDA,
  },
];

@Injectable()
export class JugadoresSeedService implements OnModuleInit {
  private readonly logger = new Logger(JugadoresSeedService.name);

  constructor(
    @InjectRepository(Jugador)
    private readonly jugadoresRepository: Repository<Jugador>,
  ) {}

  async onModuleInit() {
    const total = await this.jugadoresRepository.count();
    if (total > 0) {
      return;
    }

    const jugadores = this.jugadoresRepository.create(JUGADORES_DEMO);
    await this.jugadoresRepository.save(jugadores);
    this.logger.log(`Jugadores demo sembrados: ${JUGADORES_DEMO.length}`);
  }
}
