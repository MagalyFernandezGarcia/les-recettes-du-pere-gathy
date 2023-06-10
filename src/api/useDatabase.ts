import {
  getDatabase,
  ref,
  push,
  update as updateAPI,
  remove as removeAPI,
  onValue,
} from "firebase/database";
import { IRecipe, IRecipeWithUid } from "./types/types";
import { useEffect, useState } from "react";
import { DataSnapshot } from "@firebase/database";

enum REFS {
  RECIPE = "/recipe/",
}

const useAction = <T>(reference: REFS) => {
  const db = getDatabase();

  const create = (recipe: T) => {
    push(ref(db, reference), recipe);
  };

  const update = (uid: string, recipe: Partial<T>) => {
    const fieldsToUpdate = Object.entries(recipe).reduce(
      (fields, [property, value]) => ({
        ...fields,
        [`${reference}${uid}/${property}`]: value,
      }),
      {}
    );
    return updateAPI(ref(db), fieldsToUpdate);
  };

  const remove = (uid: string) => removeAPI(ref(db, `${reference}${uid}`));

  const [allValues, setAllValues] = useState<
    { [uid: string]: IRecipe } | undefined
  >(undefined);

  useEffect(() => {
    onValue(ref(db, reference), (snapshot: DataSnapshot) => {
      setAllValues(snapshot.val());
    });
  }, [db, reference]);

  const getAll = (): IRecipeWithUid[] => {
    return allValues
      ? Object.entries(allValues).map(([uid, value]) => ({ ...value, uid }))
      : [];
  };

  const getOne = (uid: string): IRecipeWithUid | undefined => {
    return allValues?.[uid] ? { ...allValues[uid], uid } : undefined;
  };

  return { create, update, remove, getOne, getAll };
};

export const useRecipe = () => {
  return useAction<IRecipe>(REFS.RECIPE);
};

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
