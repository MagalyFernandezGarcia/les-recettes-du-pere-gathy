import { AddRecepie } from "./AddRecipe/AddRecipe";
import { Recipe } from "./Recipe/Recipe";
import { RecipeList } from "./RecipeList/RecipeList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./hooks/userContext";

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

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};
