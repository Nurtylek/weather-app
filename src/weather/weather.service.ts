import { Injectable } from '@nestjs/common';
import { WeatherFilterDto } from './dto/weather-filter.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Units } from './models/units.enum';

@Injectable()
export class WeatherService {
  #apiUrl = this.configService.get('APP_API_URL');
  #apiAppId = this.configService.get('APP_ID');

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  get(
    filterQuery: WeatherFilterDto = { units: Units.METRIC },
  ): Observable<any> {

    const url = encodeURI(
      `${this.#apiUrl}?appid=${this.#apiAppId}&q=${filterQuery.name}&units=${
        filterQuery.units
      }`,
    );

    return this.http.get(url).pipe(
      tap((res) => {
        console.log(res);
      }),
      map((res) => res.data),
      catchError((err) => {
        console.log({ err });
        return of(err);
      }),
    );
  }
}
