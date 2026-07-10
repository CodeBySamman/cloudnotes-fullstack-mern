import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './Components/About';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Layout from './Components/Layout';



const App = () => {
 const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/> ,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);
  return (
    <div className='bg-gray-100/30'>
    <RouterProvider router={router} />
</div>
  );
}

export default App;
