import { createBrowserRouter } from "react-router";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewNote from "./pages/NewNote";
import Notes from "./pages/Notes";

export const router = createBrowserRouter([
    {
        element: <App />, 
        children: [
            { path: "/register", element: <Register />},
            { path: "/login", element: <Login />},
            { path: "/newnote", element: <NewNote />},
            { path: "/notes", element: <Notes />}
        ],
    },
]);