import React, { lazy, Suspense } from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";

// Components
import Loader from '../../components/loader'

const privateRoutes = [
    {
        path: 'project/:id',
        component: lazy(() => import('../Project')),
        exact: true,
    },
    {
        path: 'task/:id',
        component: lazy(() => import('../TaskDetail')),
        exact: true,
    },
    {
        path: 'account',
        component: lazy(() => import('../AccountManager')),
        exact: true,
    },
]

function DashboardRoutes() {
    const { url } = useRouteMatch();
    return (
        <Suspense fallback={Loader}>
            <Switch>
                {privateRoutes.map((route, idx) => (
                    <Route exact={route.exact} key={idx} path={`${url}${route.path}`}>
                        <route.component />
                    </Route>
                ))}
            </Switch>
        </Suspense>
    );
};

export default DashboardRoutes;