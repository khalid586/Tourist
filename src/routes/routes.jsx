import { createBrowserRouter } from "react-router-dom";

import Root from "../Root";
import HomePage from "../pages/HomePage";
import AddTouristSpot from "../pages/AddTouristSpot";
import LoginPage from "../pages/LoginPage";
  
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
          element:<AddTouristSpot></AddTouristSpot>,
          loader:() => fetch('http://localhost:5000/users/')
        },
        {
          path:'/login',
          element:<LoginPage></LoginPage>,
        },

      ]
    },
  ]);

  