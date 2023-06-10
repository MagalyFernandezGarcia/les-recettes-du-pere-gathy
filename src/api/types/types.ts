export enum RECIPE_CATEGORIES {
  DESERT = "dessert",
}

export enum INGREDIENT_UNITS {
  GRAMS = "grammes",
  TBSP = "cuillère à soupe",
  TSP = "cuillère à café",
  SPRINKLE = "pincée",
  PIECE = "pièce"
}

export interface IIngredient {
  quantity: number;
  unit: INGREDIENT_UNITS;
  name: string;
}

export interface IRecipe {
  name: string;
  photo: string;
  servings: number;
  category: RECIPE_CATEGORIES;
  ingredients: IIngredient[];
  instructions: string[];
}

export interface IRecipeWithUid extends IRecipe {
  uid: string;
}
