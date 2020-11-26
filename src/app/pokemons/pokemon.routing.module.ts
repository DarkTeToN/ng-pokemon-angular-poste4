import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/auth-guard.service';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { ListPokemonComponent } from './list-pokemons/list-pokemon.component';

const pokemonsRoutes: Routes = [
    {
        path: 'pokemon',
        canActivate: [AuthGuardService],
        children: [
            { path: "all", component: ListPokemonComponent },
            { path: ":id", component: DetailPokemonComponent },
            { path: "edit/:id", component: EditPokemonComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(pokemonsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PokemonRoutingModule {

}