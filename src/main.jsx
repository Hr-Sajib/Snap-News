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
import Subscription from './components/Subscription.jsx';
import Errorpage from './components/Errorpage.jsx';
import Payment from './components/Payment.jsx';
import PremiumArticles from './components/PremiumArticles.jsx';
import MyArticles from './components/MyArticles.jsx';
import MyProfile from './components/MyProfile.jsx';
import UpdateArticle from './components/UpdateArticle.jsx';
import PieChart from './components/Dashboard/PieChart.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Errorpage/>,
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
        loader: ({params}) => fetch(`https://snapnews-server.vercel.app/getarticle/${params.id}`),
        element: <ArticleDetails/>
      },
      {
        path: "/subscription",
        element: <PrivateRoute><Subscription /></PrivateRoute>
      },
      {
        path: "/payment",
        element: <Payment />
      },
      {
        path: "/dashboard",
        errorElement: <Errorpage/>,
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
            path: "all-users",
            element: <AllUsers />
          },
          {
            path: "stats",
            element: <PieChart />
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
      {
        path: "/my-articles",
        element: <PrivateRoute><MyArticles /></PrivateRoute>
      },
      {
        path: "/my-articles/updateArticle/:id",
        element: <UpdateArticle/>
      },
      {
        path: "/my-articles/details/:id",
        loader: ({params}) => fetch(`https://snapnews-server.vercel.app/getarticle/${params.id}`),
        element: <ArticleDetails/>
      },
      {
        path: "/my-profile",
        element: <PrivateRoute><MyProfile/></PrivateRoute>
      },

      {
        path: "/premium-articles",
        element: <PrivateRoute><PremiumArticles/></PrivateRoute>,
      },
      {
        path: "/premium-articles/details/:id",
        loader: ({params}) => fetch(`https://snapnews-server.vercel.app/getarticle/${params.id}`),
        element: <PrivateRoute><ArticleDetails/></PrivateRoute>
      },
      

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
