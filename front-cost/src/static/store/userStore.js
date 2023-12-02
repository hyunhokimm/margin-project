import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      userInfoPost: (user) => {
        set(() => ({
          userInfo: user,
        }));
      },

      userTengramPost: (ten) => {
        set((state) => ({
          userInfo: {
            ...state.userInfo,
            tengram: [...state.userInfo.tengram, ten],
          },
        }));
      },

      userTengramDelete: (tengramIdToDelete) => {
        set((state) => ({
          userInfo: {
            ...state.userInfo,
            tengram: state.userInfo.tengram.filter(
              (item) => item.id !== tengramIdToDelete
            ),
          },
        }));
      },

      userLogout: () => {
        set(() => ({
          userInfo: null,
        }));
      },
    }),

    {
      name: "Authorization",
    }
  )
);
export default userStore;
