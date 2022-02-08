import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [WeatherService],
  controllers: [WeatherController],
  imports: [HttpModule, ConfigModule],
})
export class WeatherModule {}
