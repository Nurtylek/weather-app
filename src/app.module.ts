import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [WeatherModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
