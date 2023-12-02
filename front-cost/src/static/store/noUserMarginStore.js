import { create } from "zustand";
import { persist } from "zustand/middleware";

const noUserMarginStore = create(
  persist(
    (set) => ({
      noUserMarginState: [],
      noUserMarginPost: (margin) => {
        set(() => ({
          noUserMarginState: [...margin],
        }));
      },
      noUserMarginDelete: () => {
        set(() => ({
          noUserMarginState: [],
        }));
      },
    }),
    {
      name: "NoUserMarginStore",
    }
  )
);

export default noUserMarginStore;
