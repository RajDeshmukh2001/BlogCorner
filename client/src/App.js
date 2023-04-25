import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Error from './components/Error';
import Profile from './components/Profile';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/blog/:id',
        element: <Blog />
      },
      {
        path: '/create',
        element: <Create />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Error />
  }
])

function App() {
  return (
    <>
      <div className="app">
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}



export default App;
