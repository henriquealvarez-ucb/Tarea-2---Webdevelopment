import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Partido } from './partido.entity.js';
import { Jugador } from '../jugadores/jugador.entity.js';
import { CreatePartidoDto } from './dto/create-partido.dto.js';
import { UpdatePartidoDto } from './dto/update-partido.dto.js';

@Injectable()
export class PartidosService {
  constructor(
    @InjectRepository(Partido)
    private readonly partidosRepository: Repository<Partido>,
    @InjectRepository(Jugador)
    private readonly jugadoresRepository: Repository<Jugador>,
  ) {}

  findAll(): Promise<Partido[]> {
    return this.partidosRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Partido> {
    const partido = await this.partidosRepository.findOneBy({ id });
    if (!partido) {
      throw new NotFoundException(`Partido ${id} no encontrado`);
    }
    return partido;
  }

  async create(dto: CreatePartidoDto): Promise<Partido> {
    const jugadores = await this.resolverJugadores(dto);
    const partido = this.partidosRepository.create({
      fecha: dto.fecha,
      hora: dto.hora,
      cancha: dto.cancha,
      categoria: dto.categoria,
      estado: dto.estado,
      tantosEquipo1: dto.tantosEquipo1 ?? null,
      tantosEquipo2: dto.tantosEquipo2 ?? null,
      ...jugadores,
    });
    return this.partidosRepository.save(partido);
  }

  async update(id: number, dto: UpdatePartidoDto): Promise<Partido> {
    const partido = await this.findOne(id);
    const jugadores =
      dto.equipo1Jugador1Id ||
      dto.equipo1Jugador2Id ||
      dto.equipo2Jugador1Id ||
      dto.equipo2Jugador2Id
        ? await this.resolverJugadores({
            equipo1Jugador1Id: dto.equipo1Jugador1Id ?? partido.equipo1Jugador1.id,
            equipo1Jugador2Id: dto.equipo1Jugador2Id ?? partido.equipo1Jugador2.id,
            equipo2Jugador1Id: dto.equipo2Jugador1Id ?? partido.equipo2Jugador1.id,
            equipo2Jugador2Id: dto.equipo2Jugador2Id ?? partido.equipo2Jugador2.id,
          })
        : {};

    Object.assign(partido, {
      fecha: dto.fecha ?? partido.fecha,
      hora: dto.hora ?? partido.hora,
      cancha: dto.cancha ?? partido.cancha,
      categoria: dto.categoria ?? partido.categoria,
      estado: dto.estado ?? partido.estado,
      tantosEquipo1:
        dto.tantosEquipo1 !== undefined ? dto.tantosEquipo1 : partido.tantosEquipo1,
      tantosEquipo2:
        dto.tantosEquipo2 !== undefined ? dto.tantosEquipo2 : partido.tantosEquipo2,
      ...jugadores,
    });
    return this.partidosRepository.save(partido);
  }

  async remove(id: number): Promise<void> {
    const partido = await this.findOne(id);
    await this.partidosRepository.remove(partido);
  }

  private async resolverJugadores(dto: {
    equipo1Jugador1Id: number;
    equipo1Jugador2Id: number;
    equipo2Jugador1Id: number;
    equipo2Jugador2Id: number;
  }) {
    const ids = [
      dto.equipo1Jugador1Id,
      dto.equipo1Jugador2Id,
      dto.equipo2Jugador1Id,
      dto.equipo2Jugador2Id,
    ];

    if (new Set(ids).size !== 4) {
      throw new BadRequestException(
        'Los 4 jugadores del partido deben ser distintos',
      );
    }

    const jugadores = await this.jugadoresRepository.findBy({ id: In(ids) });
    if (jugadores.length !== 4) {
      throw new NotFoundException('Uno o más jugadores no existen');
    }

    const porId = (id: number) => jugadores.find((j) => j.id === id)!;

    return {
      equipo1Jugador1: porId(dto.equipo1Jugador1Id),
      equipo1Jugador2: porId(dto.equipo1Jugador2Id),
      equipo2Jugador1: porId(dto.equipo2Jugador1Id),
      equipo2Jugador2: porId(dto.equipo2Jugador2Id),
    };
  }
}
