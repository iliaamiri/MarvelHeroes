import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import CreateHero from './pages/createHero'
import {PowersHomePage} from "./pages/powersHomePage";
import {EditHero} from "./pages/editHero";
import {CreatePower} from "./pages/createPower";
import {EditPower} from "./pages/editPower";
import {DeleteHero} from "./pages/deleteHero";
import {DeletePower} from "./pages/deletePower";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/heroes/new",
    element: <CreateHero />,
  },
  {
    path: "/heroes/:id/edit",
    element: <EditHero />,
  },
  {
    path: "/heroes/:id/delete",
    element: <DeleteHero />,
  },
  {
    path: "/powers",
    element: <PowersHomePage />,
  },
  {
    path: "/powers/new",
    element: <CreatePower />,
  },
  {
    path: "/powers/:id/edit",
    element: <EditPower />,
  },
  {
    path: "/powers/:id/delete",
    element: <DeletePower />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
