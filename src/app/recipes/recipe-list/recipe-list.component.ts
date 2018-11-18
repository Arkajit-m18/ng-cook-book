import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

// import { Recipe } from '../recipe.model';
// import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
// import { AuthService } from "src/app/auth/auth.service";
import * as fromRecipe from '../store/recipe.reducers';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {

    recipeState: Observable<fromRecipe.State>;
    //subscription: Subscription;

    constructor(
        // private recipeService: RecipeService,
        // private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromRecipe.FeatureState>,
        ) {}

    ngOnInit() {
      this.recipeState = this.store.select('recipes');
        // this.subscription = this.recipeService.recipesChanged
        //     .subscribe((recipes: Recipe[]) => {
        //         this.recipes = recipes;
        //     });
        // this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
      this.router.navigate(['new'], {relativeTo: this.route});
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }
}
