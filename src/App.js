import React from 'react';

// import components
import Header from './components/Header';

import Home from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import ViewProduct from './pages/ViewProduct';
import './App.css'
import Cart from './pages/Cart';
import AuthPage from "./pages/AuthPage"
import { useDispatch, useSelector } from 'react-redux';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';

const App = () => {
  const cart = useSelector((state)=> state.cart.products)

  return (
    <div className='App'>
      {/* <Header />
      <Hero />
      <Features />
      <NewItems />
      <FeaturesSecond />
      <Products />
      <Testimonial />
      <Newsletter />
      <Footer /> */}
    

      <BrowserRouter>
    <Header />

      <Routes>

      <Route path="/" element={<PublicRoutes/>} >
          <Route path="/auth" element={<AuthPage />}></Route>
        </Route>

     <Route path="/" element={<ProtectedRoutes/>}> 
          <Route index path="/"  element={ <Home/>} />
          <Route  path="/auth"  element={ <AuthPage/>} />
           <Route exact path="/product/:id" element={<ViewProduct/>} />
          <Route path="/cart" element={<Cart/>}  />

    </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
