import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar';
import Products from './pages/products/Products';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Cart from './pages/cart/Cart';
import ProductsDetails from './pages/products/ProductsDetails';

import Mens from './components/mens/Mens';
import Women from './components/womens/Women';
import Electronics from './components/electronics/Electronics';
import Jewelery from './components/jewelery/Jewelery';
import DisplayToast from './utils/DisplayTosty';
import WishlistPage from './components/wishlist/wishlist';
import Profile from './components/prifile/Profile.jsx';
import Search from './components/search/Search';


function App() {
  const router = createBrowserRouter([{
    path:"/",
    element:<Navbar/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"products",
        
        element:<Products/>
      },
      {
        path:"mens",
        element:<Mens/>
      },
      {
        path:"women",
        element:<Women/>
      },
      {
        path:"electronics",
        element:<Electronics/>
      },
      {
        path:"jewelery",
        element:<Jewelery/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {
        path:"product/:id",
        element:<ProductsDetails/>
      },
  
      {
        path:"colors",
        element:<DisplayToast/>
      },
      {
        path:"wishlist",
        element:<WishlistPage/>
      },
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"search",
        element:<Search/>
      },
    ]
  }])
  return(
    <>
    <RouterProvider router={router}/>
    </>
  )
 
}

export default App
