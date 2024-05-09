import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Item from './pages/Item.jsx';
import Variety from './pages/Variety.jsx';
import User from './pages/User.jsx';
import Admin from './pages/Admin.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Search from './pages/Search.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/items/:id',
        element: <Item />
      },
      {
        path: '/category/:varietyName',
        element: <Variety />
      },
      {
        path: '/account/:id',
        element: <User />
      },
      {
        path:'/account/admin',
        element: <Admin />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/search',
        element: <Search />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);