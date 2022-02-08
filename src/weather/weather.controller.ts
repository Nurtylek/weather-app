import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherFilterDto } from './dto/weather-filter.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  findAll(@Query() filterQuery: WeatherFilterDto) {
    return this.weatherService.get(filterQuery);
  }
}
