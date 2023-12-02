import { create } from "zustand";
import { persist } from "zustand/middleware";

const recipeStore = create(
  persist(
    (set) => ({
      recipeState: [],
      recipePost: (el) => {
        set((state) => ({
          recipeState: [...state.recipeState, { ...el }],
        }));
      },
      recipeDelete: (id) => {
        set((state) => {
          const newRecipeState = state.recipeState.filter((el) => el.id !== id);
          return {
            recipeState: newRecipeState,
          };
        });
      },
      recipeAllDelete: () => {
        set(() => ({
          recipeState: [],
        }));
      },
    }),

    {
      name: "RecipeStore",
    }
  )
);

export default recipeStore;
