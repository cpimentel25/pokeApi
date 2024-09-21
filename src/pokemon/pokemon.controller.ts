import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import {
  PokemonAndTypesDto,
  PokemonDetailDto,
  PokemonDto,
} from './dto/pokemon.dto';

@Controller('api/pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  /**
   * Get list of the first 100 Pokemons.
   * @returns {Promise<PokemonDto[]>} List of Pokemon names and URLs.
   */
  @Get()
  async getAllPokemons(): Promise<{ results: PokemonDto[] }> {
    return this.pokemonService.getAllPokemons();
  }

  /**
   * Get details of a specific Pokemon by ID.
   * @param {string} id - The ID of the Pokemon.
   * @returns {Promise<PokemonDetailDto>} Pokemon details including name and types.
   */
  @Get(':id')
  async getPokemonById(@Param('id') id: string): Promise<PokemonDetailDto> {
    return this.pokemonService.getPokemonById(+id);
  }

  /**
   * Get Pokemon details along with types and their translations.
   * @param {string} id - The ID of the Pokemon.
   * @returns {Promise<PokemonAndTypesDto>} Pokemon details with translated type names.
   */
  @Get('types/:id')
  async getPokemonAndTypes(
    @Param('id') id: string,
  ): Promise<PokemonAndTypesDto> {
    return this.pokemonService.getPokemonAndTypes(+id);
  }
}
