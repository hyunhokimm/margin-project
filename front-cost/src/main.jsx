import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/MainPage";
import MarginPage from "./pages/margin/ElementPricePage";
import BasketPage from "./pages/margin/BasketPage";
import TengramCalculate from "./pages/margin/TengramCalculate";
import RecipeBookPage from "./pages/margin/RecipeBookPage";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import UserInfoPage from "./pages/user/UserInfoPage";
import NotFoundPage from "./pages/NotFoundPage";
import RecipeMakePage from "./pages/margin/RecipeMakePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <MarginPage /> },
      { path: "/basket", element: <BasketPage /> },
      { path: "/price", element: <TengramCalculate /> },
      { path: "/recipebook", element: <RecipeBookPage /> },
      { path: "/recipemake", element: <RecipeMakePage /> },

      { path: "/userinfo", element: <UserInfoPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/main", element: <MainPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
