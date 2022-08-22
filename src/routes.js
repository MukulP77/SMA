import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Twitter from './pages/Twitter';
import TwitterAdd from './pages/TwitterAdd';
import TwitterEdit from './pages/TwitterEdit';
import Insta from './pages/Insta';
import InstaAdd from './pages/InstaAdd';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/dashboard/:id',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'twitter', element: <Twitter /> },
        { path: 'twitter/add', element: <TwitterAdd /> },
        { path: 'twitter/edit', element: <TwitterEdit /> },
        { path: 'insta', element: <Insta /> },
        { path: 'insta/add', element: <InstaAdd /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
