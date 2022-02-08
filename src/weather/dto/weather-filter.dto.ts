import { Units } from '../models/units.enum';

export class WeatherFilterDto {
  name?: string;
  units?: Units = Units.METRIC;
}
