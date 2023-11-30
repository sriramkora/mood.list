import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./Pages/AuthenticationPage.jsx";
import ResultPage from "./Pages/ResultPage.jsx";
import AccountPage from "./Pages/AccountPage.jsx";
import logo from "./logo.svg";
import "./CSS/App.css";
import ErrorPage from "./Pages/Error.js";
import RootLayout from "./Pages/Root.js";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as logoutAction } from "./Pages/Logout";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthenticationPage />,
    action: authAction,
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage />, loader: checkAuthLoader },
      { path: "result", element: <ResultPage />, loader: checkAuthLoader },
      { path: "account", element: <AccountPage />, loader: checkAuthLoader },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
