import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./Page/Homepage/Homepage";
import ErrorPage from "./Page/ErrorPage";
import Admin from "./Page/Admin/Admin";
import Favoris from "./Page/Admin/components/Favoris/Favoris";

export const router = createBrowserRouter([
    {
        path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: "/",
            element: <Homepage/>,
          },
        {
            path: "/admin",
            element: <Admin/>,
          },
        {
            path: "/favoris",
            element: <Favoris/>,
          },
    ]
    }
])