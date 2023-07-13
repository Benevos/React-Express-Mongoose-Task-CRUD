//@ts-check

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css';

import Home from './pages/Home';

//@ts-ignore
import Update from './pages/Update';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home/>,
  },
  {
    path: "/edit",
    element: <Update/>
  },
  {
    path: "*",
    element: <div>Does not exist</div>
  }
]);

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
