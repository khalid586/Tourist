import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";
import HomePage from "../pages/HomePage";
import AddTouristSpot from "../pages/AddTouristSpot";
import LoginPage from "../pages/LoginPage"; 
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import MyList from "../pages/MyList";
import ProtectedRoute from "./ProtectedRoute";
import PlaceDetails from "../pages/PlaceDetails";
import ErrorPage from "../pages/ErrorPage";
import UpdatePage from "../pages/UpdatePage";
import AllSpots from "../pages/AllSpots";
import dotenv from 'dotenv';

  
 export const router = createBrowserRouter([
    {
      path: "/",
      element:<Root></Root> ,  
      errorElement:<ErrorPage></ErrorPage>, 
      children:[
        {
          path:'/',
          element:<HomePage></HomePage>,
        },
        {
           path:"/all_spots",
           element:<AllSpots></AllSpots>,
        },
        {
          path:'/add_spot',
          element:<ProtectedRoute> <AddTouristSpot></AddTouristSpot></ProtectedRoute> ,
        },
        {
          path:'/login',
          element:<LoginPage></LoginPage>,
        },
        {
          path:'/profile',
          element:<ProtectedRoute><ProfilePage></ProfilePage></ProtectedRoute>,
        },
        {
          path:'/register',
          element:<RegisterPage></RegisterPage>
        },
        {
          path:'/mylist',
          element: <ProtectedRoute><MyList></MyList></ProtectedRoute>
        },
        {
          path:'/update/:id',
          element: <ProtectedRoute><UpdatePage></UpdatePage> </ProtectedRoute>,
          loader:({params}) => fetch(`https://b9a10-server-side-khalid586-theta.vercel.app/details/${params.id}`)
        },
        {
          path:'/details/:id',
          element:<ProtectedRoute><PlaceDetails></PlaceDetails></ProtectedRoute>,
          loader:({params})=>fetch(`https://b9a10-server-side-khalid586-theta.vercel.app/details/${params.id}`)
        }

      ]
    },
  ]);

  