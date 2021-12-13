import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { CONFIGURATION_KEYS } from '../config.keys.enum';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        
        return {
          type: 'postgres',
          host: config.get<string>(CONFIGURATION_KEYS.DATABASE_HOST),
          username: config.get<string>(CONFIGURATION_KEYS.DATABASE_USERNAME),
          password: config.get(CONFIGURATION_KEYS.DATABASE_PASSWORD),
          database: config.get(CONFIGURATION_KEYS.DATABASE_NAME),
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
          ], 
          synchronize: true, //Delete on production
        } as ConnectionOptions;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
