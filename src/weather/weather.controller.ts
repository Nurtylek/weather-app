import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import {
  WeatherFilterDto,
} from './dto/weather-filter.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiBody({ type: WeatherFilterDto })
  @Get()
  findByCityName(@Query() filterQuery: WeatherFilterDto) {
    return this.weatherService.getCityWeatherByCityName(filterQuery);
  }

  @ApiBody({ type: WeatherFilterDto })
  @Get('wind-speed')
  findWindSpeedByCityName(@Query() filterQuery: WeatherFilterDto) {
    return this.weatherService.getCityWindSpeedByCityName(filterQuery);
  }
}
