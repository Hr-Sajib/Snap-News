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
import Dashboard from './components/Dashboard/Dashboard.jsx';
import AllUsers from './components/Dashboard/AllUsers.jsx';
import AddPublisher from './components/Dashboard/AddPublisher.jsx';
import AllAdminArticles from './components/Dashboard/AllAdminArticles.jsx';
import ArticleDetails from './components/ArticleDetails.jsx';





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
      {
        path: "/all-articles/details/:id",
        loader: ({params}) => fetch(`http://localhost:5500/getarticle/${params.id}`),
        element: <ArticleDetails/>
      },
      {
        path: "/subscription",
        // element: <Subscription />
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
            path: "all-users",
            element: <AllUsers />
          },
          {
            path: "all-articles",
            element: <AllAdminArticles />
          },
          {
            path: "add-publisher",
            element: <AddPublisher />
          }
        ]
      },
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
