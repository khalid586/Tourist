import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";
import HomePage from "../pages/HomePage";
import AddTouristSpot from "../pages/AddTouristSpot";
import LoginPage from "../pages/LoginPage"; 
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import MyList from "../pages/MyList";
import ProtectedRoute from "./ProtectedRoute";
  
 export const router = createBrowserRouter([
    {
      path: "/",
      element:<Root></Root> ,      
      children:[
        {
          path:'/',
          element:<HomePage></HomePage>,
        },
        {
          path:'/add_spot',
          element:<ProtectedRoute> <AddTouristSpot></AddTouristSpot></ProtectedRoute> ,
          loader:() => fetch('http://localhost:5000/places/')
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
        }

      ]
    },
  ]);

  