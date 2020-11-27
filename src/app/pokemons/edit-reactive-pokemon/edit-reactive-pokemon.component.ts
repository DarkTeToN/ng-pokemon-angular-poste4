import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-reactive-pokemon',
  templateUrl: './edit-reactive-pokemon.component.html',
  styleUrls: ['./edit-reactive-pokemon.component.scss']
})
export class EditReactivePokemonComponent implements OnInit {

  pokemon: Pokemon = null;

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private _pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
    this._pokemonService.getPokemon(+this.route.snapshot.paramMap.get('id')).subscribe(x => this.pokemon = x);
  }

}
