import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

function ProtectedRoute({children}) {
    const {user,loading} = useContext(AuthContext);
    const {pathname} = useLocation();

    if(loading)
        return(
            <Spinner></Spinner>
        )

    if(user){
        return children;
    }

    return <Navigate state = {pathname} to = '/login'></Navigate>
}

export default ProtectedRoute