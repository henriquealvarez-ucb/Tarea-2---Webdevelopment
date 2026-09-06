import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jugador } from './jugador.entity.js';
import { JugadoresService } from './jugadores.service.js';
import { JugadoresController } from './jugadores.controller.js';
import { JugadoresSeedService } from './jugadores-seed.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jugador]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [JugadoresController],
  providers: [JugadoresService, JugadoresSeedService],
  exports: [JugadoresService],
})
export class JugadoresModule {}
