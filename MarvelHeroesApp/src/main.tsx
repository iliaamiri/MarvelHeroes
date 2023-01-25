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
    element: <CreateHero />,
  },
  {
    path: "/heroes/:id/delete",
    element: <CreateHero />,
  },
  {
    path: "/powers",
    element: <PowersHomePage />,
  },
  {
    path: "/powers/:id/edit",
    element: <PowersHomePage />,
  },
  {
    path: "/powers/:id/delete",
    element: <PowersHomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
