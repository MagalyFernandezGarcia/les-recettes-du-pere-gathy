import { AddRecepie } from "./AddRecipe/AddRecipe";
import { Recipe } from "./Recipe/Recipe";
import { RecipeList } from "./RecipeList/RecipeList";
import { useRecipe } from "./api/useDatabase";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RecipeList />,
    },
    {
      path: "/recipe/:uid",
      element: <Recipe />,
      loader: async ({ params }) => params.uid,
    },
    {
      path: "/recipe/add",
      element: <AddRecepie />,
    },
  ]);

  return <RouterProvider router={router} />;
};
