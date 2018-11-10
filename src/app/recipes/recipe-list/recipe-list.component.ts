import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from '../recipe.model';
import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[] = [];
    subscription: Subscription;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService) {}

    ngOnInit() {
        this.subscription = this.recipeService.recipesChanged
            .subscribe((recipes: Recipe[]) => {
                this.recipes = recipes;
            });
        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
      if (!this.authService.isAuthenticated()) {
        alert('You need to be logged in to add a new recipe');
        this.router.navigate(['/']);
      }
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}