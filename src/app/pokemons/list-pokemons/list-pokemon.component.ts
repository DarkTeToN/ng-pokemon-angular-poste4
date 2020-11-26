import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent implements OnInit, OnChanges {

  constructor(private router: Router,
    private _pokemonService: PokemonService) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    // changes.
  }
  pokemons: Pokemon[];
  title: string = "Test application";
  content: string = "";

  ngOnInit(): void {
    this._pokemonService.getPokemons().subscribe(x => this.pokemons = x);
  }

  selectPokemon(pkmn: any): void {
    this.router.navigate(['pokemon', pkmn.id])
  }

}
