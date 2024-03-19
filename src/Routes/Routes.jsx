import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import LogIn from "../pages/Login/LogIn";
import SignUP from "../pages/SignUp/SignUP";
import PrivateRoute from "./PrivateRoute";
import Screct from "../pages/Shared/Screct/Screct";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'menu', 
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: '/login',
          element: <LogIn/>
        },
        {
           path: '/signup',
           element: <SignUP/>
        },
        {
          path: '/screct',
          element : <PrivateRoute><Screct/></PrivateRoute>
        }
       
      ]
    },
    {
      path:'dashboard',
      element: <Dashboard/>,
      children:[
        {
          path: 'cart',
          element: <Cart/>
        }
      ]
    }

  ]);