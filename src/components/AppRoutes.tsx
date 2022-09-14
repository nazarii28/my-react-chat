import React, {useContext} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {privateRoutes, publicRoutes} from "../routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {LOGIN_ROUTE, ROOMS_ROUTE} from "../utils/consts";
import {AuthContext, IAuthContext} from "../context/auth/AuthState";
import Layout from './Layout';


const AppRouter = () => {

    const {auth} = useContext(AuthContext) as IAuthContext;
    const [user] = useAuthState(auth)

    return user ?
        (
            <Layout>
                <Routes>
                    {
                        privateRoutes.map(route =>
                            <Route key={route.path} path={route.path} element={route.component} />
                        )
                    }
                    <Route path='*' element={<Navigate to={ROOMS_ROUTE} />} />
                </Routes>
            </Layout>
        )
        :
        (
            <Routes>
                {
                    publicRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={route.component} />
                    )
                }
                <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        )

};

export default AppRouter;