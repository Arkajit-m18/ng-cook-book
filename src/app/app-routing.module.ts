import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from "./core/home/home.component";
import { AuthGuard } from "./auth/auth-guard.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'Recipes', loadChildren: './recipes/recipes.module#RecipesModule' }

    // { path: 'Recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard] }
    // { path: 'ShoppingList', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule', canLoad: [AuthGuard] },
    // { path: 'credentials', loadChildren: './auth/auth.module#AuthModule' }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [
        RouterModule
    ],
    providers: [
      AuthGuard
    ]
})

export class AppRoutingModule {
}
