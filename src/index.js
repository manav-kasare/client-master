import React from 'react';
import ReactDOM from 'react-dom/client';
import { AddClient, DataEntry, Home } from './routes';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addClient",
    element: <AddClient />,
  },
  {
    path: "/dataEntry",
    element: <DataEntry />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
