import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-reactive-form',
  templateUrl: './pokemon-reactive-form.component.html',
  styleUrls: ['./pokemon-reactive-form.component.scss']
})
export class PokemonReactiveFormComponent implements OnInit, OnChanges {

  @Input() pokemon: Pokemon = null; //Propriété d'entrée du composant
  editPokemonForm: FormGroup;
  submitted: boolean = false;
  types: Array<string>;

  constructor(
    private formBuilder: FormBuilder,
    private _pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pokemon) {
      this.submitted = false;
      this.editPokemonForm = this.formBuilder.group({
        name: [this.pokemon.name, [Validators.required, Validators.pattern('^[a-zA-Z0-9àéèç]{1,25}$')]],
        hp: [this.pokemon.hp, [Validators.required, Validators.min(1), Validators.max(999)]],
        cp: [this.pokemon.cp, [Validators.required, Validators.min(1), Validators.max(99)]]
      });
    }
  }

  ngOnInit(): void {
    this.types = this._pokemonService.getPokemonTypes();
  }


  get form() { return this.editPokemonForm.controls }

  // Détermine si le type passé en paramètre appartient ou non au pokémon en cours d'édition
  hasType(type: string): boolean {
    let index = this.pokemon.types.indexOf(type);
    if (index > -1) return true;
    return false;
  }

  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition
  selectType($event: any, type: string): void {
    let checked = $event.target.checked;
    if (checked) {
      this.pokemon.types.push(type);
    } else {
      let index = this.pokemon.types.indexOf(type);
      if (index > -1) {
        this.pokemon.types.splice(index, 1)
      }
    }
  }

  // Valide le nombre de types pour chaque pokémon
  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }

    if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editPokemonForm.invalid) return;

    this.pokemon = {
      ...this.pokemon,
      ...this.editPokemonForm.value
    }
    // La formule est equivalentee à faire ça:
    // this.pokemon.name = this.editPokemonForm.value.name;
    // this.pokemon.cp = this.editPokemonForm.value.cp;
    // this.pokemon.hp = this.editPokemonForm.value.hp;
    this._pokemonService.updatePokemon(this.pokemon).subscribe(() => {
      let link = ['pokemon', this.pokemon.id];
      this.router.navigate(link);
    });
  }

}
