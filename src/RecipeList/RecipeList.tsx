import "./recipeList.css";
import { useRecipe } from "../api/useDatabase";
import { RECIPE_CATEGORIES } from "../api/types/types";
import { Link } from "react-router-dom";
import { useAuth } from "../api/useAuth";

export const RecipeList = () => {
  const recipeApi = useRecipe();
  const recipes = recipeApi.getAll();
  const { login, logout, user, isUserAllowed } = useAuth();

  console.log("user", user);
  console.log("isUserAllowed", isUserAllowed);

  // console.log(recipes);

  const saltyRecipes = recipes.filter(
    (recipe) => recipe.category === RECIPE_CATEGORIES.SALTY
  );
  const sweetRecipes = recipes.filter(
    (recipe) => recipe.category === RECIPE_CATEGORIES.SWEET
  );

  return (
    <>
      <div className="test">
        <div className="headerBox">
          <div className="mainTitle">
            Les recettes du père Gathy
            {/* <div className="addRecipe">
              <ButtonOfNavigation
                road="/recipe/add"
                name="Ajouter une recette"
              />
            </div> */}
          </div>
        </div>

        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>

        <div className="foodType">
          <details>
            <summary className="subTitle">Recettes sucrées</summary>
            <ul className="recipesList">
              {sweetRecipes.map((sweetRecipe) => (
                <li key={sweetRecipe.uid}>
                  <Link
                    className="recipesList"
                    to={"/recipe/" + sweetRecipe.uid}
                  >
                    {sweetRecipe.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <details>
            <summary className="subTitle">Recettes salées</summary>
            <ul className="recipesList">
              {saltyRecipes.map((saltyRecipe) => (
                <li key={saltyRecipe.uid}>
                  <Link
                    className="recipesList"
                    to={"/recipe/" + saltyRecipe.uid}
                  >
                    {saltyRecipe.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </>
  );
};
