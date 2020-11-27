import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from 'src/auth-guard.service';
import { BorderCardDirective } from './border-card.directive';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { EditReactivePokemonComponent } from './edit-reactive-pokemon/edit-reactive-pokemon.component';
import { ListPokemonComponent } from './list-pokemons/list-pokemon.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonReactiveFormComponent } from './pokemon-reactive-form/pokemon-reactive-form.component';
import { PokemonTypeColorPipe } from './pokemon-types-color.pipe';
import { PokemonRoutingModule } from './pokemon.routing.module';
import { PokemonService } from './pokemon.service';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';

@NgModule({
    declarations: [
        ListPokemonComponent,
        DetailPokemonComponent,
        BorderCardDirective,
        PokemonTypeColorPipe,
        PokemonFormComponent,
        EditPokemonComponent,
        SearchPokemonComponent,
        PokemonReactiveFormComponent,
        EditReactivePokemonComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PokemonRoutingModule
    ],
    providers: [
        PokemonService,
        AuthGuardService
    ]
})

export class PokemonsModule { }