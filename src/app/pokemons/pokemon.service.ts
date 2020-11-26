import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { POKEMONS } from './mock-pokemon';
import { Pokemon } from './pokemon';

@Injectable()

export class PokemonService {

private pokemonsUrl: string = 'api/pokemons';

    constructor(private http: HttpClient) { }

    getPokemons(): Observable<Pokemon[]> {
        return this.http.get<Pokemon[]>(this.pokemonsUrl);
    }

    getPokemon(id: number): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.pokemonsUrl}/${id}`);
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const httpOptions = {
            headers: new HttpHeaders({"Content-type": "application/json"})
        }
        return this.http.put<Pokemon>(this.pokemonsUrl, pokemon, httpOptions);
    }

    getPokemonTypes(): Array<string> {
        return [
            'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
            'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
        ]
    }

    deletePokemon(id: Number): Observable<Pokemon> {
        return this.http.delete<Pokemon>(`${this.pokemonsUrl}/${id}`);
    }

    
    searchPokemons(term: string): Observable<Pokemon[]> {
        if (!term.trim) return of([]);
        return this.http.get<Pokemon[]>(`${this.pokemonsUrl}?name=${term}`);
    }
}