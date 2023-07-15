import { useRecipe } from "../api/useDatabase";
import {
  INGREDIENT_UNITS,
  IRecipe,
  RECIPE_CATEGORIES,
} from "../api/types/types";
import { photoBase64 } from "./photoBase64";

const itemUid = "-NXa_PJ9EmNurG3czp9B";

const exampleRecipe: IRecipe = {
  name: "Poulet du général Tao",
  category: RECIPE_CATEGORIES.SALTY,
  servings: 2,
  photo: photoBase64,
  steps: [
    {
      name: "Cuisson du riz",
      instructions: ["Lancer la cuisson du riz rond au rice cooker"],
      ingredients: [
        { name: "riz rond", quantity: 170, unit: INGREDIENT_UNITS.GRAMS },
      ],
    },
    {
      name: "Préparation des beignets de poulet",
      ingredients: [
        {
          name: "poitrine de poulet",
          quantity: 200,
          unit: INGREDIENT_UNITS.GRAMS,
        },
        { name: "fécule de maïs", quantity: 100, unit: INGREDIENT_UNITS.GRAMS },
        { name: "blanc d'oeuf", quantity: 1, unit: INGREDIENT_UNITS.PIECE },
        { name: "huile de sésame", quantity: 1, unit: INGREDIENT_UNITS.TBSP },
        { name: "sel", quantity: 1, unit: INGREDIENT_UNITS.SPRINKLE },
        { name: "poivre", quantity: 1, unit: INGREDIENT_UNITS.SPRINKLE },
      ],
      instructions: [
        "Découper le poulet en dés de taille moyenne",
        "Mélanger les dés de poulet avec le blanc d'oeuf, l'huile de sésame. Saler et poivrer",
        "Incorporer la fécule de maïs, bien envelopper tous les dés de poulet",
        "Réserver le poulet pour la cuisson plus tard",
      ],
    },
    {
      name: "Préparation de la sauce",
      ingredients: [
        { name: "ail émincé", quantity: 1, unit: INGREDIENT_UNITS.TBSP },
        { name: "gingembre émincé", quantity: 1, unit: INGREDIENT_UNITS.TBSP },
        { name: "vinaigre de riz", quantity: 3, unit: INGREDIENT_UNITS.TBSP },
        { name: "sauce soja", quantity: 3, unit: INGREDIENT_UNITS.TBSP },
        { name: "sucre", quantity: 3, unit: INGREDIENT_UNITS.TBSP },
        { name: "fécule de maïs", quantity: 1.5, unit: INGREDIENT_UNITS.TSP },
        { name: "eau", quantity: 150, unit: INGREDIENT_UNITS.GRAMS },
      ],
      instructions: [
        "Hacher ail et gingembre",
        "Mélanger tous les ingrédients dans verre doseur à mixeur plongeant : sucre, vinaigre, sauce soja, ail émincé, gingembre émincé, fécule de maïs et l'eau",
        "Mixer le tout avec un mixeur plongeant jusqu'à ce que l'ail et le gingembre soient bien hachés et le mélange homogène",
      ],
    },
    {
      name: "Cuisson des beignets en sauce",
      instructions: [
        "Faire préchauffer la friteuse à 150°C",
        "Faire cuire les beignets une première fois pendant 2 min à 150°C pour cuire le poulet",
        "Monter la température de la friteuse à 180°C",
        "Cuire les beignets une deuxième fois à 180°C pendant 1 min pour les rendre croustillants",
        "Verser la sauce dans une poelle feu au max",
        "Laisser la sauce caraméliser en mélangeant régulièrement",
        "Une fois la sauce épaissie, verser les beignets et bien tous les recouvrir de sauce en mélangeant",
        "Servir avec du Riz",
      ],
    },
    {
      name: "Montage",
      instructions: [
        "Dans un bol, place du riz",
        "Recouvrir le riz de poulet en sauce",
        "Décorer avec des graines de sésame et/ou des oignons verts découpés en rondelles",
      ],
    },
  ],
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




  interface Car {
    brand: string;
    model: string;
    passengers: number;
  }

  interface Person {
    age: number;
    sexe: string;
    address: string;
    hairColor: string;
    cars: Car[];
  }

  const obj: Person = {
    age: 18,
    sexe: "femme",
    address: "rue de machin, ....",
    hairColor: "blond",
    cars: [
      {
        brand: "VW",
        model: "ID4",
        passengers: 5,
      },
      {
        brand: "Smart",
        model: "Fortwo",
        passengers: 2,
      },
    ],
  };

  const helloWorld = (person: Person) => {};
  const test = (person: Person) => {};

  // helloWorld({
  //   age: 18,
  //   sexe: "femme",
  //   address: "rue de machin, ....",
  //   hairColor: "brun"
  // })


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

      {/*{elements &&*/}
      {/*  elements.map((elem) => {*/}
      {/*    return (*/}
      {/*      <div key={elem.uid}>*/}
      {/*        <h1>{elem.name}</h1>*/}
      {/*        <img src={elem.photo} style={{ width: "300px" }} />*/}
      {/*        <p>{`${elem.category} pour ${elem.servings} personnes`}</p>*/}
      {/*        <article>*/}
      {/*          <h3>Ingrédients :</h3>*/}
      {/*          <ul>*/}
      {/*            {elem.ingredients.map(({ name, quantity, unit }, index) => (*/}
      {/*              <li key={index}>{`${quantity} ${unit} de ${name}`}</li>*/}
      {/*            ))}*/}
      {/*          </ul>*/}
      {/*        </article>*/}
      {/*        <article>*/}
      {/*          <h3>Préparation :</h3>*/}
      {/*          <ol>*/}
      {/*            {elem.instructions.map((step, index) => (*/}
      {/*              <li key={index}>{step}</li>*/}
      {/*            ))}*/}
      {/*          </ol>*/}
      {/*        </article>*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}
    </div>
  );
};
