import React, { lazy, Suspense } from 'react'
import { Route, Redirect, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom'
import Loader from 'src/components/loader/loader.js'
import ErrorBoundary from './ErrorBoundary'
import { PUBLIC_ROUTE } from './route.constants'
import Auth from 'src/utils/Auth'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5'
import { parse, stringify } from 'query-string'

const publicRoutes = []

function PrivateRoute({ children, ...rest }) {
    let location = useLocation()
    const isLoggedIn = Auth.isLoggedIn()
    if (isLoggedIn) return <Route {...rest}>{children}</Route>
    return (
        <Redirect
            to={{
                pathname: '/login',
                state: { from: location },
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
                                {/*<Dashboard />*/}
                            </PrivateRoute>
                            {/*<Route component={Page404} />*/}
                        </Switch>
                    </QueryParamProvider>
                </Router>
            </Suspense>
        </ErrorBoundary>
    )
}