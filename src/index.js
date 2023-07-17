import React from 'react';
import ReactDOM from 'react-dom/client';
import { AddClient, DataEntry, Home } from './routes';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer />
  </React.StrictMode>
);
