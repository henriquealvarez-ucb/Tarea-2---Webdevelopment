import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { PartidosService } from './partidos.service.js';
import { CreatePartidoDto } from './dto/create-partido.dto.js';
import { UpdatePartidoDto } from './dto/update-partido.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  @Get()
  findAll() {
    return this.partidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partidosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePartidoDto) {
    return this.partidosService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePartidoDto) {
    return this.partidosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partidosService.remove(id);
  }
}
