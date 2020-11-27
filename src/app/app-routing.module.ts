import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './app-pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';

const appRoutes: Routes = [
    { path: "", redirectTo: "upload", pathMatch: "full" },
    { path: "register", component: RegisterComponent },
    { path: "upload", component: UploadComponent },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouting {

}