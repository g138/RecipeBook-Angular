import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, take, tap, exhaustMap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataSharedService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService  ) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log(recipes);
    this.http.put('https://ng-recipebook-c1b44.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-recipebook-c1b44.firebaseio.com/recipes.json')
      .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipe => {
        this.recipeService.setRecipes(recipe);
      })
    );
  }
}
