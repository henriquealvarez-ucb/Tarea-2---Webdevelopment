import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const email = this.configService.get<string>('SEED_USER_EMAIL')!;
    const password = this.configService.get<string>('SEED_USER_PASSWORD')!;

    const existente = await this.usersService.findByEmail(email);
    if (existente) {
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    await this.usersService.create({
      email,
      password: hash,
      nombre: 'Henrique Alvarez',
    });
    this.logger.log(`Usuario demo sembrado: ${email}`);
  }
}
