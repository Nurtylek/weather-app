import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { WeatherFilterDto } from './dto/weather-filter.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable } from 'rxjs';
import { Units } from './models/units.enum';
import { WeatherResponseModel, Wind } from './models/weather.model';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger();

  #apiUrl = this.configService.get('APP_API_URL');
  #apiAppId = this.configService.get('APP_ID');

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getCityWeatherByCityName(
    filterQuery: WeatherFilterDto,
  ): Observable<WeatherResponseModel> {
    const url = encodeURI(
      `${this.#apiUrl}?appid=${this.#apiAppId}&q=${filterQuery.name}&units=${
        filterQuery.units ?? Units.METRIC
      }`,
    );

    return this.http.get<WeatherResponseModel>(url).pipe(
      map((res) => res.data),
      catchError((err) => {
        this.logger.error('Error while getting weather: ', err);
        throw new InternalServerErrorException(
          `Error getting data weather api`,
        );
      }),
    );
  }

  getCityWindSpeedByCityName(filterQuery: WeatherFilterDto): Observable<Wind> {
    const url = encodeURI(
      `${this.#apiUrl}?appid=${this.#apiAppId}&q=${filterQuery.name}&units=${
        filterQuery.units ?? Units.METRIC
      }`,
    );

    return this.http.get<WeatherResponseModel>(url).pipe(
      map((res) => res.data),
      map((weather) => weather.wind),
      catchError((err) => {
        this.logger.error('Error while getting wind speed: ', err);
        throw new InternalServerErrorException(
          `Error while getting wind speed`,
        );
      }),
    );
  }
}
