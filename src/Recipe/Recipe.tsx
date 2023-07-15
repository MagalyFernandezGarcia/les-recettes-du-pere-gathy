import { useLoaderData } from "react-router-dom";
import { useRecipe } from "../api/useDatabase";
import "./recipe.css";
import { IRecipeWithUid, IStep } from "../api/types/types";

import { Fragment, useState } from "react";
import { ButtonOfNavigation } from "../Button/Button";

export const ListOfIngredients = ({
  step,
  recipe,
  numberOfEaters,
}: {
  step: IStep;
  recipe: IRecipeWithUid;
  numberOfEaters?: number;
}) => {
  return (
    <>
      {step.ingredients?.map((ingredient) => (
        <li key={ingredient.name}>
          {(ingredient.quantity / recipe.servings) *
            (numberOfEaters ?? recipe.servings)}{" "}
          {ingredient.unit} de {ingredient.name}
        </li>
      ))}
    </>
  );
};

export const Recipe = () => {
  const recipeUid = useLoaderData() as string;

  const recipeApi = useRecipe();
  const recipe = recipeApi.getOne(recipeUid);
  const [numberOfEaters, setNumberOfEaters] = useState(recipe?.servings);

  if (!recipe) {
    return null;
  }

  return (
    <>
      <div className="recipeTitle">
        {recipe.name}{" "}
        <div className="homeButton">
          <ButtonOfNavigation road="/" name="Home" />
        </div>
        <div className="updateButton">
          <ButtonOfNavigation road="/" name="Modifier" />
        </div>
        <div className="deleteButton">
          <ButtonOfNavigation road="/" name="Supprimer" />
        </div>
      </div>

      <div className="numberofEaters">
        Pour:{" "}
        <input
          type="number"
          value={numberOfEaters ?? recipe.servings}
          className="changeNumberOfServing"
          onChange={(event) => {
            setNumberOfEaters(Number(event.target.value));
          }}
        />
        personnes
      </div>

      {recipe.photo && (
        <img className="pictureOfFood" src={recipe.photo} alt="recette" />
      )}

      <div>
        <div className="ingredientTitle">Ingrédients</div>
        <ul className="listOfIngredients">
          {recipe.steps.map((step) => (
            <ListOfIngredients
              key={step.name}
              step={step}
              recipe={recipe}
              numberOfEaters={numberOfEaters}
            />
          ))}
        </ul>
      </div>

      <div>
        <div className="stepsTitle">Préparation</div>
        {recipe.steps.map((step) => {
          return (
            <Fragment key={step.name}>
              <div className="stepName">{step.name}</div>
              <div className="instructionsWithIngredient">
                <div className="instructionSize">
                  <ol>
                    {step.instructions.map((instruction) => (
                      <li key={instruction} className="listOfSteps">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                {step.ingredients && (
                  <div className="ingredientsInsideRecipe ingredientSize">
                    <ul>
                      <ListOfIngredients
                        step={step}
                        recipe={recipe}
                        numberOfEaters={numberOfEaters}
                      />
                    </ul>
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};
