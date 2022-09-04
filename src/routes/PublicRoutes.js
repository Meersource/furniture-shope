import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PublicRoutes = () => {

const auth = useSelector((state)=> state.cart.token)

  return auth ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
