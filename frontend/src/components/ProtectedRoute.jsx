import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const {loading,isAuthenticated} = useContext(AuthContext);

  if(loading){
    return <p>Loading...</p>;
  }

  if(!isAuthenticated){
    return <Navigate to="/login" />
  }

  return children;
}

export default ProtectedRoute
