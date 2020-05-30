import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataSharedService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
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
          // @ts-ignore
          this.recipeService.setRecipes(recipe);
        })
      )
      // .subscribe(recipes => {
      //   console.log(recipes);
      //   this.recipeService.setRecipes(recipes);
      // });
  }



}
