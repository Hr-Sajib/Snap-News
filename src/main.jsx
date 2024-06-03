import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root.jsx';
import Home from './components/Home/Home.jsx';
import { HelmetProvider } from "react-helmet-async";
import Login from './components/AuthProvider/Login.jsx';
import AuthProvider from './components/AuthProvider/AuthProvider.jsx';
import Signup from './components/AuthProvider/Signup.jsx';
import AddArticle from './components/Home/AddArticles.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateRoute from './components/PrivateRoute.jsx';
import AllArticles from './components/AllArticles.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/add-articles",
        element: <PrivateRoute><AddArticle/></PrivateRoute>
      },
      {
        path: "/all-articles",
        element: <AllArticles />
      },
      // {
      //   path: "/subscription",
      //   element: <Subscription />
      // },
      // {
      //   path: "/dashboard",
      //   element: <Dashboard />
      // },
      // {
      //   path: "/my-articles",
      //   element: <MyArticles />
      // },
      // {
      //   path: "/premium-articles",
      //   element: <PremiumArticles />
      // },
      // {
      //   path: "/user-photo",
      //   element: <UserPhoto />
      // }
    ]
  },
]);



const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider  client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
</React.StrictMode>
)
