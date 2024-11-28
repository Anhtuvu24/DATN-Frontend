import React, { lazy, Suspense } from 'react'
import {Avatar, Badge} from 'antd';
import {Route, Switch} from "react-router-dom";

// Components
import Dashboard from "../Dashboard/";
import Loader from '../../components/loader';
import MainLayout from "../../components/MainLayout/index.jsx";
import { MdNotifications } from "react-icons/md";

// Images
import logoCVS from "../../assets/images/logo-cvs.svg";

// Styles
import { NavigationWrapper } from './local.styles';

const Home = lazy(() => import('../Home'));

function PrivateScreens() {
    return (
        <MainLayout>
            <NavigationWrapper>
                <div className={'primaryNavigation'}>
                    <div className={'logoWrapper'}>
                        <img width={140} src={logoCVS} alt={'CVS logo'} />
                    </div>
                </div>
                <div className={'secondNavigation'}>
                    <div className={'item-nav'}>
                        <Badge count={5} size={"small"}>
                            <MdNotifications color={'#637381'} fontSize={24} />
                        </Badge>
                    </div>
                    <div>
                        <Avatar
                            style={{
                                backgroundColor: '#7265e6',
                                verticalAlign: 'middle',
                            }}
                            size={32}
                        >
                            T
                        </Avatar>
                    </div>
                </div>
            </NavigationWrapper>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact={true} path={'/home'} >
                        <Home />
                    </Route>
                    <Dashboard />
                </Switch>
            </Suspense>
        </MainLayout>
    );
};

export default React.memo(PrivateScreens)