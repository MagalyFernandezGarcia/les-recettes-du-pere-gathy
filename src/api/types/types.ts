export enum RECIPE_CATEGORIES {
  SWEET = "sucré",
  SALTY = "salé",
  
}

export enum INGREDIENT_UNITS {
  GRAMS = "grammes",
  TBSP = "cuillère à soupe",
  TSP = "cuillère à café",
  SPRINKLE = "pincée",
  PIECE = "pièce",
  MILILITRE = "mililitre",
  LITRE = "litre"
}

export interface IIngredient {
  quantity: number;
  unit: INGREDIENT_UNITS;
  name: string;
}

export interface IStep {
  name: string;
  ingredients?: IIngredient[];
  instructions: string[];
}
export interface IRecipe {
  name: string;
  photo: string;
  servings: number;
  category: RECIPE_CATEGORIES;
  steps: IStep[];
}

export interface IRecipeWithUid extends IRecipe {
  uid: string;
}
