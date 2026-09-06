import { PartialType } from '@nestjs/mapped-types';
import { CreatePartidoDto } from './create-partido.dto.js';

export class UpdatePartidoDto extends PartialType(CreatePartidoDto) {}
