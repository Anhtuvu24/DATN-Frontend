import React, {lazy, Suspense, useEffect} from 'react'
import { Avatar, Badge } from 'antd';
import {Route, Switch, useHistory} from "react-router-dom";

// Components
import Dashboard from "../Dashboard/";
import Loader from '../../components/loader';
import MainLayout from "../../components/MainLayout/index.jsx";
import { MdNotifications } from "react-icons/md";
import {useDispatch} from "react-redux";

// Actions
import {getMe} from "../../redux/main/actions/auth.js";

// Images
import logoCVS from "../../assets/images/logo-cvs.svg";

// Styles
import { NavigationWrapper } from './local.styles';
import {getUsers} from "../../redux/main/actions/user.js";
import {getProjectTypes} from "../../redux/main/actions/project_type.js";
import {getStatuses} from "../../redux/main/actions/status.js";

const Home = lazy(() => import('../Home'));

function PrivateScreens() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGetMe = async () => {
            const res = await dispatch(getMe());
            if (res.status === 403) {
                history.push('/login');
            }
        }
        fetchGetMe();
        dispatch(getStatuses(1, 100));
        dispatch(getUsers(1, 100));
        dispatch(getProjectTypes(1, 100));
    }, [])

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