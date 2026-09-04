import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Jugador } from './jugador.entity.js';
import { CreateJugadorDto } from './dto/create-jugador.dto.js';
import { UpdateJugadorDto } from './dto/update-jugador.dto.js';

@Injectable()
export class JugadoresService {
  constructor(
    @InjectRepository(Jugador)
    private readonly jugadoresRepository: Repository<Jugador>,
  ) {}

  findAll(): Promise<Jugador[]> {
    return this.jugadoresRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Jugador> {
    const jugador = await this.jugadoresRepository.findOneBy({ id });
    if (!jugador) {
      throw new NotFoundException(`Jugador ${id} no encontrado`);
    }
    return jugador;
  }

  async create(dto: CreateJugadorDto): Promise<Jugador> {
    await this.assertEmailDisponible(dto.email);
    const jugador = this.jugadoresRepository.create(dto);
    return this.jugadoresRepository.save(jugador);
  }

  async update(id: number, dto: UpdateJugadorDto): Promise<Jugador> {
    const jugador = await this.findOne(id);
    if (dto.email && dto.email !== jugador.email) {
      await this.assertEmailDisponible(dto.email);
    }
    Object.assign(jugador, dto);
    return this.jugadoresRepository.save(jugador);
  }

  async remove(id: number): Promise<void> {
    const jugador = await this.findOne(id);
    try {
      await this.jugadoresRepository.remove(jugador);
    } catch (error) {
      const code = (error as { driverError?: { code?: string } })?.driverError?.code;
      if (error instanceof QueryFailedError && (code === '23503' || code === '23001')) {
        throw new ConflictException(
          'No se puede eliminar: el jugador tiene partidos asociados',
        );
      }
      throw error;
    }
  }

  private async assertEmailDisponible(email: string): Promise<void> {
    const existente = await this.jugadoresRepository.findOneBy({ email });
    if (existente) {
      throw new ConflictException('Ya existe un jugador con ese correo');
    }
  }
}
