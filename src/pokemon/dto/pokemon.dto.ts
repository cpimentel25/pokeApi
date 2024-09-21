import { IsString, IsUrl, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO que representa un Pokémon con su nombre y URL.
 */
export class PokemonDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}

/**
 * DTO que representa los detalles de un Pokémon con sus tipos.
 */
export class PokemonDetailDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PokemonTypeDto)
  types: PokemonTypeDto[];
}

/**
 * DTO que representa un tipo de Pokémon con su nombre y URL.
 */
class PokemonTypeDto {
  @IsString()
  slot: number;

  @ValidateNested()
  @Type(() => PokemonTypeDetailDto)
  type: PokemonTypeDetailDto;
}

/**
 * DTO que representa los detalles de un tipo de Pokémon.
 */
class PokemonTypeDetailDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}

/**
 * DTO que incluye un Pokémon con sus tipos traducidos al español.
 */
export class PokemonAndTypesDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PokemonTypeWithTranslationDto)
  types: PokemonTypeWithTranslationDto[];
}

/**
 * DTO que representa un tipo de Pokémon con su traducción.
 */
class PokemonTypeWithTranslationDto {
  @IsString()
  slot: number;

  @ValidateNested()
  @Type(() => PokemonTranslatedDetailDto)
  type: PokemonTranslatedDetailDto;
}

/**
 * DTO que incluye la traducción de un tipo de Pokémon.
 */
class PokemonTranslatedDetailDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageTranslationDto)
  names: LanguageTranslationDto[];
}

/**
 * DTO que representa una traducción en un idioma específico.
 */
class LanguageTranslationDto {
  @ValidateNested()
  @Type(() => LanguageDto)
  language: LanguageDto;

  @IsString()
  name: string;
}

/**
 * DTO que representa un idioma.
 */
class LanguageDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}
