import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PokemonAndTypesDto,
  PokemonDetailDto,
  PokemonDto,
} from './dto/pokemon.dto';
import axios from 'axios';
import { config } from 'dotenv';

config();

@Injectable()
export class PokemonService {
  private readonly apiUrl = process.env.API_URL;

  /**
   * Gets the first 100 Pokémon from the PokeAPI.
   * @returns {Promise<PokemonDto[]>} List with the names and URLs of the Pokémon.
   * @throws {HttpException} If any error occurs while calling the API.
   */
  async getAllPokemons(): Promise<PokemonDto[]> {
    try {
      const { data } = await axios.get(`${this.apiUrl}/pokemon?limit=100`);
      return data.results.map((pokemon: any) => ({
        name: pokemon.name,
        url: pokemon.url,
      }));
    } catch (error) {
      console.error('Error getAllPokemon: ', error);
      throw new HttpException(
        'Failed to fetch Pokemon list',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Gets the details of a specific Pokémon by its ID.
   * @param {number} id - Pokemon ID.
   * @returns {Promise<PokemonDetailDto>} Details of the Pokémon, including its types.
   * @throws {HttpException} If the ID is invalid or the Pokémon cannot be found.
   */
  async getPokemonById(id: number): Promise<PokemonDetailDto> {
    try {
      const { data } = await axios.get(`${this.apiUrl}/pokemon/${id}`);
      return {
        name: data.name,
        types: data.types.map((typeInfo: any) => ({
          slot: typeInfo.slot,
          type: {
            name: typeInfo.type.name,
            url: typeInfo.type.url,
          },
        })),
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Pokemon not found', HttpStatus.NOT_FOUND);
      } else {
        console.error('Error getPokemonById: ', error);
        throw new HttpException(
          'Failed to fetch Pokemon details',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Gets a Pokémon by its ID and translates its types into español.
   * @param {number} id - pokemon ID.
   * @returns {Promise<PokemonAndTypesDto>} Details of the Pokémon, including its translated types.
   * @throws {HttpException} If the ID is invalid or the Pokémon cannot be found.
   */
  async getPokemoinAndTypes(id: number): Promise<PokemonAndTypesDto> {
    try {
      const { data } = await axios.get(`${this.apiUrl}/pokemon/${id}`);
      const typeWithTranslation = await Promise.all(
        data.types.map(async (typeInfo: any) => {
          const typeData = await axios.get(typeInfo.type.url);
          const translations = typeData.data.names.filter(
            (name: any) => name.language.name === 'es',
          );
          return {
            slot: typeInfo.slot,
            type: {
              name: typeInfo.type.name,
              url: typeInfo.type.url,
              names: translations.map((translation: any) => ({
                language: {
                  name: translation.language.name,
                  url: translation.language.url,
                },
                name: translation.name,
              })),
            },
          };
        }),
      );

      return {
        name: data.name,
        types: typeWithTranslation,
      };
    } catch (error) {
      console.error('Error getPokemoinAndTypes: ', error);
      throw new HttpException(
        'Failed to fetch Pokemon types and translations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
