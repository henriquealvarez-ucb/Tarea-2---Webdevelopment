import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partido } from './partido.entity.js';
import { Jugador } from '../jugadores/jugador.entity.js';
import { PartidosService } from './partidos.service.js';
import { PartidosController } from './partidos.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partido, Jugador]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PartidosController],
  providers: [PartidosService],
})
export class PartidosModule {}
