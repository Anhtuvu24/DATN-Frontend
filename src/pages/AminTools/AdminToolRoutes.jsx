import React, { lazy, Suspense } from 'react';
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

// Components
import Loader from '../../components/loader'

const Page404 = lazy(() => import('../404.jsx'));

const privateRoutes = [
    {
        path: '/account',
        component: lazy(() => import('../AccountManager')),
        exact: true,
    },
    {
        path: '/project-type',
        component: lazy(() => import('../ProjectTypeManager')),
        exact: true,
    },
]

function AdminDashboardRoutes() {
    const { url } = useRouteMatch();
    return (
        <Suspense fallback={Loader}>
            <Switch>
                {privateRoutes.map((route, idx) => (
                    <Route exact={route.exact} key={idx} path={`${url}${route.path}`}>
                        <route.component />
                    </Route>
                ))}
                <Route  component={Page404} />
            </Switch>
        </Suspense>
    );
};

export default AdminDashboardRoutes;