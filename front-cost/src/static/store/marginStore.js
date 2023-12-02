import { create } from "zustand";
import { persist } from "zustand/middleware";

const marginStore = create(
  persist(
    (set) => ({
      marginState: [],
      marginPost: (margin) => {
        set((state) => ({
          marginState: [...state.marginState, { ...margin }],
        }));
      },
    }),
    {
      name: "MarginStore",
    }
  )
);
export default marginStore;
