import { Units } from '../models/units.enum';
import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherFilterDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsEmpty()
  readonly units?: Units;
}
