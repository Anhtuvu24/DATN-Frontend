import React, { lazy, Suspense } from 'react';
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

// Components
import Loader from '../../components/loader'

const Page404 = lazy(() => import('../404.jsx'));

const privateRoutes = [
    {
        path: 'project/:idProject',
        component: lazy(() => import('../Project')),
        exact: true,
    },
    {
        path: 'project/:idProject/task/:id',
        component: lazy(() => import('../TaskDetail')),
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
                {/*<Route path={'/'}>*/}
                {/*    <Redirect to={'home'} />*/}
                {/*</Route>*/}
                <Route  component={Page404} />
            </Switch>
        </Suspense>
    );
};

export default DashboardRoutes;