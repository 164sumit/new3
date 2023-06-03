import React from 'react'
import {Outlet,Navigate} from "react-router-dom"

function ProtectedRoute({isAuthentication}) {
    if(!isAuthentication){
        return(
            <Navigate to="/login" />

        )
    }

  return (
    <div>
        <Outlet/>
      
    </div>
  )
}

export default ProtectedRoute
