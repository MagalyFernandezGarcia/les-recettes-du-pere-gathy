import { toBase64, useRecipe } from "../api/useDatabase";
import { useNavigate } from "react-router-dom";
import "./addRecipe.css";

import {
  IIngredient,
  INGREDIENT_UNITS,
  IRecipe,
  RECIPE_CATEGORIES,
} from "../api/types/types";
import { FormEvent, useState } from "react";
import { ButtonOfNavigation } from "../Button/Button";

export const AddIngredient = ({
  lineNumber,
  stepIndex,
}: {
  lineNumber: number;
  stepIndex: Number;
}) => {
  return (
    <>
      <div className="newIngredient">
        <div>
          <div>
            <label htmlFor="ingredientName">
              Entre le nom de ton ingrédient
            </label>
          </div>
          <input
            id="ingredientName"
            className="ingredientInput"
            name={"step" + stepIndex + "ingredient" + lineNumber}
          ></input>
        </div>
        <div>
          <div>
            <label htmlFor="quantityOfIngredient">Entre la quantité</label>
          </div>
          <input
            id="quantityOfIngredient"
            type="number"
            step={0.01}
            className="ingredientInput"
            name={"step" + stepIndex + "quantity" + lineNumber}
          ></input>
        </div>
        <div>
          <div>
            <label htmlFor="measurementUnit">Choisis l'unité de mesure</label>
          </div>
          <select
            id="measurementUnit"
            className="ingredientInput"
            name={"step" + stepIndex + "measurementUnit" + lineNumber}
          >
            {Object.values(INGREDIENT_UNITS).map((ingredientUnit) => (
              <option key={ingredientUnit} value={ingredientUnit}>
                {ingredientUnit}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export const AddSteps = ({
  stepNumber,
  mainStepIndex,
}: {
  stepNumber: number;
  mainStepIndex: number;
}) => {
  return (
    <>
      <li>
        <textarea
          className="textOfSteps"
          placeholder="Décris ton étape"
          name={"step" + mainStepIndex + "instructionOfRecipe" + stepNumber}
          rows={5}
          cols={120}
        ></textarea>
      </li>
    </>
  );
};

export const NewStep = ({ newStepNumber }: { newStepNumber: number }) => {
  const [addIngredients, setAddIngredients] = useState([""]);
  const [stepsToFollow, setStepsToFollow] = useState([""]);
  return (
    <>
      <div className="nameOfStep">Nomme ton étape</div>
      <div className="container">
        <input
          placeholder="Nom de l'étape"
          className="inputName"
          name={"stepName" + newStepNumber}
        />
      </div>
      <div className="listOfIngredient">Liste tes ingrédients : </div>
      {addIngredients.map((addingredient, index) => (
        <AddIngredient
          key={index}
          lineNumber={index}
          stepIndex={newStepNumber}
        />
      ))}
      <button
        className="addLineButton"
        type="button"
        onClick={() => {
          setAddIngredients([...addIngredients, ""]);
        }}
      >
        +
      </button>
      <div className="descriptionOfSteps">Décris les étapes à suivre</div>
      <ol className="numbersOfStepList">
        {stepsToFollow.map((stepToFollow, index) => (
          <AddSteps
            key={index}
            stepNumber={index}
            mainStepIndex={newStepNumber}
          />
        ))}
      </ol>
      <button
        className="addLineButton"
        type="button"
        onClick={() => {
          setStepsToFollow([...stepsToFollow, ""]);
        }}
      >
        +
      </button>
    </>
  );
};

export const AddRecepie = () => {
  const recipeApi = useRecipe();
  const navigate = useNavigate();

  const recipeCategorys = Object.values(RECIPE_CATEGORIES);

  const [newStep, setNewStep] = useState([""]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as unknown as {
      imageOfRecipe: File;
      numbersOfServing: string;
      recipeName: string;
      typeOfRecipe: RECIPE_CATEGORIES;
      [index: string]: any;
    };
    console.log("data", data);
    let imageBase64 = "";

    if (data.imageOfRecipe.size && data.imageOfRecipe.name) {
      imageBase64 = await toBase64(data.imageOfRecipe);
    }

    const stepsArray = [];
    for (let i = 0; i < newStep.length; i++) {
      const completeNameStep = "stepName" + i;

      const entries = Object.entries(data);
      const instructionsArray = entries.filter((entry) => {
        return (
          entry[0].includes("step" + i + "instructionOfRecipe") &&
          entry[1] !== ""
        );
      });
      const instructions = instructionsArray.map((instruction) => {
        return instruction[1];
      });

      const ingredientNameArray = entries.filter((entry) => {
        return entry[0].includes("step" + i + "ingredient");
      });
      const unitArray = entries.filter((entry) => {
        return entry[0].includes("step" + i + "measurementUni");
      });
      const quantityArray = entries.filter((entry) => {
        return entry[0].includes("step" + i + "quantity");
      });
      const ingredientFull: IIngredient[] = [];

      for (let j = 0; j < ingredientNameArray.length; j++) {
        if (
          (ingredientNameArray[j][1] as string) !== "" &&
          quantityArray[j][1] !== ""
        ) {
          ingredientFull[j] = {
            quantity: Number(quantityArray[j][1]),
            unit: unitArray[j][1] as INGREDIENT_UNITS,
            name: ingredientNameArray[j][1] as string,
          };
        }
      }

      if (data[completeNameStep] !== "" && instructions.length > 0) {
        stepsArray[i] = {
          name: data[completeNameStep],
          instructions: instructions,
          ingredients: ingredientFull,
        };
      }
    }

    const createData: IRecipe = {
      name: data.recipeName,
      servings: Number(data.numbersOfServing),
      photo: imageBase64,
      category: data.typeOfRecipe,
      steps: stepsArray,
    };

    console.log("creteData", createData);

    if (
      createData.name !== "" &&
      createData.servings > 0 &&
      createData.category &&
      createData.steps.length
    ) {
      const recipeId = await recipeApi.create(createData);
      navigate("/recipe/" + recipeId);
    } else {
      console.error("Recipe is incomplete");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="topPageManagement">
        <h1 className="addRecipeTitle">Ajouter une recette</h1>
        <div className="homeButton">
          <ButtonOfNavigation road="/" name="Home" />
        </div>
        <button type="reset" className="clearButton">
          Effacer tout
        </button>
      </div>
      <div className="questions">Entre le nom de ta recette : </div>
      <input
        placeholder="Nom de la recette"
        className="choice"
        name="recipeName"
      ></input>

      <div className="questions">Ajoute une image de ton plat</div>
      <input
        className="choice"
        type="file"
        accept="image/png, image/jpeg"
        name="imageOfRecipe"
      ></input>
      <div className="questions"> Quel est le type de plat ?</div>
      <select className="choice" name="typeOfRecipe">
        {" "}
        <option value="">Choisis un type de plat</option>
        {recipeCategorys.map((recipeCategory) => (
          <option key={recipeCategory} value={recipeCategory}>
            {recipeCategory}
          </option>
        ))}
      </select>
      <div className="questions">Pour combien de personnes ?</div>
      <input
        type="number"
        placeholder="nombre de personnes"
        className="choice"
        name="numbersOfServing"
      />
      <h3 className="subtitleStep">Ajoute les étapes de ta recette</h3>
      {newStep.map((step, index) => (
        <NewStep key={index} newStepNumber={index} />
      ))}

      <button
        className="addStep"
        type="button"
        onClick={() => {
          setNewStep([...newStep, ""]);
        }}
      >
        Ajouter une étape
      </button>

      <button type="submit" className="validationButton">
        Valider
      </button>
    </form>
  );
};
