import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
    selector: 'detail-pokemon',
    templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {

    pokemon: Pokemon;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _pokemonService: PokemonService
    ) { }

    ngOnInit(): void {
        this._pokemonService.getPokemon(+this.route.snapshot.paramMap.get('id')).subscribe(data =>  this.pokemon = data,
            error => console.log(error),
            () => {
                if (!this.pokemon) {
                    this.router.navigate(['page-not-found']);
                }
            });
    }

    goBack() {
        this.router.navigate(['pokemon', 'all'])
    }

    editPokemon() {
        this.router.navigate(['pokemon', 'edit', this.pokemon.id])
    }

    deletePokemon() {
        this._pokemonService.deletePokemon(this.pokemon.id).subscribe(() => this.goBack());
    }

}