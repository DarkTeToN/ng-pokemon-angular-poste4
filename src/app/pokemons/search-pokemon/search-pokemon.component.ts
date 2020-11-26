import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {

private searchTerms = new Subject<string>();
pokemons$: Observable<Pokemon[]>;

  constructor(
    private _pokemonService: PokemonService,
    private router: Router) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // Attendre 300ms
      debounceTime(300),
      // Ignorer la recherche en cours si c'est la même que la précédente
      distinctUntilChanged(),
      // Retourner la liste des résutlats correspondant aux termes de la recherche
      switchMap((term: string) => this._pokemonService.searchPokemons(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  goDetail(pokemon: Pokemon) {
    this.router.navigate(['pokemon', pokemon.id])
  }

}
