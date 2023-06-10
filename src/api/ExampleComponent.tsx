import { useRecipe } from "../api/useDatabase";
import {
  INGREDIENT_UNITS,
  IRecipe,
  RECIPE_CATEGORIES,
} from "../api/types/types";
import { photoBase64 } from "./photoBase64";

const itemUid = "-NXa_PJ9EmNurG3czp9B";

const exampleRecipe: IRecipe = {
  name: "Cookies",
  category: RECIPE_CATEGORIES.DESERT,
  servings: 4,
  instructions: [
    "Faire préchauffer four à 180°C",
    "Mélanger le beurre pommade (mou) et le sucre",
    "Ajouter les oeufs et le sel et mélanger",
    "Ajouter la farine et la levure chimique et mélanger",
    "Ajouter la vanille et mélanger",
    "Ajouter les pépites de chocolat et mélanger",
    "Disposer des petites boules de pâtes (sans les écraser) sur une plaque pour le four",
    "Enfourner la plaque (seule) pendant 12 minutes",
    "Recommencer autant de plaques que nécessaire",
  ],
  ingredients: [
    { name: "beurre", quantity: 200, unit: INGREDIENT_UNITS.GRAMS },
    { name: "sucre", quantity: 300, unit: INGREDIENT_UNITS.GRAMS },
    { name: "oeuf", quantity: 2, unit: INGREDIENT_UNITS.PIECE },
    {
      name: "pépites de chocolat",
      quantity: 300,
      unit: INGREDIENT_UNITS.GRAMS,
    },
    { name: "farine", quantity: 350, unit: INGREDIENT_UNITS.GRAMS },
    { name: "levure chimique", quantity: 0.5, unit: INGREDIENT_UNITS.TSP },
    { name: "sel", quantity: 0.5, unit: INGREDIENT_UNITS.TSP },
    { name: "extrait de vanille", quantity: 1, unit: INGREDIENT_UNITS.TBSP },
  ],
  photo: photoBase64,
};

const examplePartialRecipeToUpdate: Partial<IRecipe> = {
  name: "Crème brulée",
};

export const ExampleComponent = () => {
  // Récupérer les fonctions d'api avec useRecipe()
  const { create, update, remove, getAll, getOne } = useRecipe();

  // getAll : récupérer toutes les recettes sous forme de tableau
  const elements = getAll();
  console.log("getAll", elements);

  // getOne : récupérer une recette unique, prends en parametre l'uid de l'objet à récupérer
  const element = getOne(itemUid);
  console.log("getOne()", element);

  return (
    <div>
      {/* create: ajoute un élément en DB, prends en parametre un objet de type IRecipe */}
      <div>
        <button onClick={() => create(exampleRecipe)}>CREATE</button>
      </div>

      {/* update: fait une mise à jour partiel d'un élément en DB, prends en parametre
       l'uid de l'élément à modifier ainsi qu'un objet IRecipe partiel contenant les nouvelles valeurs */}
      <div>
        <button onClick={() => update(itemUid, examplePartialRecipeToUpdate)}>
          UPDATE
        </button>
      </div>

      {/* remove: supprimer un élément en DB, prends en parametre un uid */}
      <div>
        <button onClick={() => remove(itemUid)}>REMOVE</button>
      </div>

      {elements && elements.map((elem) => {
        return (
          <div key={elem.uid}>
            <h1>{elem.name}</h1>
            <img src={elem.photo} style={{ width: "300px" }} />
            <p>{`${elem.category} pour ${elem.servings} personnes`}</p>
            <article>
              <h3>Ingrédients :</h3>
              <ul>
                {elem.ingredients.map(({ name, quantity, unit }, index) => (
                  <li key={index}>{`${quantity} ${unit} de ${name}`}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Préparation :</h3>
              <ol>
                {elem.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </article>
          </div>
        );
      })}
    </div>
  );
};
