import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import NewNote from "./pages/NewNote";

export const router = createBrowserRouter([
    {
        element: <App />, 
        children: [
            { path: "/", element: <Home />},
            { path: "/about", element: <About />},
            { path: "/newnote", element: <NewNote />},
        ],
    },
]);