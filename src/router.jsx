import React, { lazy, Suspense } from 'react'
import { Route, Redirect, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom'

import { PUBLIC_ROUTE } from './route.contants'
import Auth from './utils/Auth/index'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5'
import { parse, stringify } from 'query-string'

// Components
import Loader from './components/loader'
import ErrorBoundary from './ErrorBoundary'
const PrivateScreen = lazy(() => import('./pages/PrivateScreens/index.jsx'))

const publicRoutes = [
    {
        path: '/login',
        component: lazy(() => import('../src/pages/Login')),
        exact: true,
    },
]

function PrivateRoute({ children, ...rest }) {
    const isLoggedIn = Auth.isLoggedIn()
    if (isLoggedIn) return <Route {...rest}>{children}</Route>
    return (
        <Redirect
            to={{
                pathname: '/login',
            }}
        />
    )
}

export default function Routes() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader />}>
                <Router
                    getUserConfirmation={() => {
                    }}
                >
                    <QueryParamProvider
                        adapter={ReactRouter5Adapter}
                        options={{
                            searchStringToObject: parse,
                            objectToSearchString: stringify,
                        }}
                    >
                        <Switch>
                            {publicRoutes.map((route, index) => (
                                <Route key={index} path={route.path} exact={route.exact}>
                                    <route.component />
                                </Route>
                            ))}
                            <PrivateRoute path='/'>
                                <PrivateScreen />
                            </PrivateRoute>
                            {/*<Route component={Page404} />*/}
                        </Switch>
                    </QueryParamProvider>
                </Router>
            </Suspense>
        </ErrorBoundary>
    )
}