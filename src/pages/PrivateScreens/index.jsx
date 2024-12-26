import React, {lazy, Suspense, useEffect, useState, useRef} from 'react'
import {Avatar, Badge, Dropdown, Input, Popover} from 'antd';
import {Route, Switch, useHistory} from "react-router-dom";
import { Loading3QuartersOutlined, SyncOutlined } from '@ant-design/icons';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// Components
import Dashboard from "../Dashboard/";
import DashboardAdmin from "../AminTools";
import Loader from '../../components/loader';
import MainLayout from "../../components/MainLayout/index.jsx";
import {MdNotifications, MdOutlineSearch} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";

// Actions
import {getMe, logout} from "../../redux/main/actions/auth.js";
import actions from "../../redux/app/actions.js";

const { changeCurrent } = actions;
// Images
import logoCVS from "../../assets/images/logo-cvs.svg";

// Styles
import {
    DropDownButton,
    ListNotiSearch,
    ListTaskSearch,
    NavigationWrapper, NodataMenu,
    OptionProject,
    TitleListNoties
} from './local.styles';
import {getUsers} from "../../redux/main/actions/user.js";
import {getProjectTypes} from "../../redux/main/actions/project_type.js";
import {getStatuses} from "../../redux/main/actions/status.js";
import AvatarCustom from "../../components/AvatarCustom/index.jsx";
import {useDebounce} from "use-debounce";
import {searchTasks} from "../../redux/main/actions/task.js";
import Priority from "../../components/Priority";
import createNotification from "../../utils/notificationHelper";
import {getActionsByUser, updateAction} from "../../redux/main/actions/action.js";
import {timeAgo} from "../../utils/helper.js";
import NotiItemSearch from "./NotiItemSearch";
import TaskSearchItem from "./TaskSearchItem";
import {getProjects} from "../../redux/main/actions/project.js";

const Home = lazy(() => import('../Home'));
const Profile = lazy(() => import('../Profile'));

function PrivateScreens() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [isLoadingGetSearch, setIsLoadingGetSearch] = useState(false);
    const [isLoadingGetNoti, setIsLoadingGetNoti] = useState(false);
    const [isOpenNoti, setIsOpenNoti] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState({ search: '' });
    const [debouncedQuery] = useDebounce(query, 500);
    const containerRef = useRef(null);

    const projects = useSelector(state => state.main.entities.project?.projects?.data) || [];
    const me = useSelector(state => state.main.entities.auth.user) || {};
    const tasksSearch = useSelector(state => state.main.entities.task.searchTasks) || {};
    const noties = useSelector(state => state.main.entities.auth.noties) || {};
    const tasks = me.tasks || [];

    const optionTask = tasks.map(item => {
        const { sprint, id } = item;
        return {
            key: `project/${sprint.id_project}/task/${id}`,
            label: <OptionProject><Priority size={24} type={item?.priority} /><p>{item.name}</p></OptionProject>
        }
    });

    const optionProject = projects.map((item) => {
        return {
            key: item.id,
            label: <OptionProject><AvatarCustom name={item.name} src={item.icon} type={'square'} /> {item.name}</OptionProject>
        }
    })

    const items = [
        {
            key: 'profile',
            label: 'Profile',
        },
        me?.role === 'admin' && (
            {
                key: 'admin-tools',
                label: 'Admin tool',
            }
        ),
        {
            key: 'logout',
            label: 'Logout',
        },
    ];

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
        dispatch(getActionsByUser(me.id, 1, 100));
        dispatch(getProjects(1, 100));
    }, [])

    useEffect(() => {
        dispatch(getActionsByUser(me.id, 1, 100));
    }, [me])

    useEffect(() => {
        const fetchSearch = async () => {
            setIsLoadingGetSearch(true);
            const res = await dispatch(searchTasks({search: debouncedQuery.search, limit: 20, page: 1}));
            setIsLoadingGetSearch(false);
        }
        fetchSearch();
    }, [debouncedQuery])

    const fetchNoties = async (e) => {
        e.stopPropagation();
        setIsLoadingGetNoti(true);
        const res = await dispatch(getActionsByUser(me.id, 1, 100));
        if (res.status !== 200) {
            createNotification('error', 'An error occurred while retrieving the notification');
        }
        setIsLoadingGetNoti(false);

    }

    useEffect(() => {
        const fetchNoti = async () => {
            setIsLoadingGetNoti(true);
            const res = await dispatch(getActionsByUser(me.id, 1, 100));
            if (res.status !== 200) {
                createNotification('error', 'An error occurred while retrieving the notification');
            }
            setIsLoadingGetNoti(false);
        }
        if (isOpenNoti) {
            fetchNoti();
        }
    }, [isOpenNoti]);

    const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setIsFocused(false);
            setIsOpenNoti(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onChangeSearch = (e) => {
        setQuery({search: e.target.value});
    }

    const onFocus = async () => {
        if (isOpenNoti) {
            setIsOpenNoti(false);
        }
        setIsFocused(true);
        setIsLoadingGetSearch(true);
        const res = await dispatch(searchTasks({search: '', limit: 20, page: 1}));
        setIsLoadingGetSearch(false);
    }

    const renderContentSearch = () => {
        return (
            <ListTaskSearch>
                {isLoadingGetSearch ? (
                    <div className={'searchLoading'}>
                        <Loading3QuartersOutlined style={{ fontSize: 20, color: '#ec1c2a' }} spin={true} />
                    </div>
                ): (
                    <>
                        {tasksSearch?.data?.length ? (
                         <>
                             {tasksSearch?.data?.map(item => {
                                 return <TaskSearchItem key={item.id} item={item} setIsFocused={setIsFocused} />
                             })}
                         </>
                        ): (
                            <div className={'emptyResult'}>
                                <svg width="150" height="110" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><title>No data</title><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
                                <p>No data</p>
                            </div>
                        )}
                    </>
                )}
            </ListTaskSearch>
        )
    }

    const renderContentNoti = () => {
        return (
            <ListNotiSearch>
                {isLoadingGetNoti ? (
                    <div className={'searchLoading'}>
                        <Loading3QuartersOutlined style={{ fontSize: 20, color: '#ec1c2a' }} spin={true} />
                    </div>
                ): (
                    <>
                        {noties?.data?.length ? (
                            <>
                                {noties?.data?.map(item => {
                                    return (
                                        <NotiItemSearch key={item.id} item={item} setIsOpenNoti={setIsOpenNoti} />
                                    )
                                })}
                            </>
                        ) : (
                            <div className={'emptyResult'}>
                                <svg width="150" height="110" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><title>No data</title><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
                                <p>No data</p>
                            </div>
                        )}
                    </>
                )}
            </ListNotiSearch>
        )
    }

    const onCLickItemMenu = async ({item, key, keyPath, domEvent}) => {
        if (key === 'logout') {
            const res = await dispatch(logout());
            if (res.status === 200) {
                createNotification('success', 'Logout success');
                history.push('/login');
            } else {
                createNotification('error', 'Logout fail');
            }
        }
        if (key === 'profile') {
            history.push('/profile')
        }
        if (key === 'admin-tools') {
            history.push('/admin/account');
        }
    }

    const onClickProjectItem = ({item, key, keyPath, domEvent}) => {
        dispatch(changeCurrent('board'));
        history.push(`/project/${key}`);
    }

    const onClickTaskItem = ({item, key, keyPath, domEvent}) => {
        history.push(`/${key}`);
    }

    return (
        <MainLayout>
            <NavigationWrapper>
                <div className={'primaryNavigation'}>
                    <div className={'logoWrapper'} onClick={() => history.push('/home')}>
                        <img width={140} src={logoCVS} alt={'CVS logo'} />
                    </div>
                    <div className={'mainActive'}>
                        <Dropdown
                            trigger={'click'}
                            getPopupContainer={triggerNode => triggerNode}
                            menu={{
                                items: optionProject,
                                onClick: ({item, key, keyPath, domEvent}) => onClickProjectItem({item, key, keyPath, domEvent})
                            }}
                            dropdownRender={optionProject?.length ? null : () => (
                                <NodataMenu>
                                    <svg width="80" height="60" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><title>No data</title><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
                                    <p>No data</p>
                                </NodataMenu>
                            )}
                        >
                            <DropDownButton>
                                <p>Projects</p>
                                <MdOutlineKeyboardArrowDown color={'#44546F'} />
                            </DropDownButton>
                        </Dropdown>
                        <Dropdown
                            trigger={'click'}
                            getPopupContainer={triggerNode => triggerNode}
                            menu={{
                                items: optionTask,
                                onClick: ({item, key, keyPath, domEvent}) => onClickTaskItem({item, key, keyPath, domEvent})
                            }}
                            dropdownRender={optionTask?.length ? null : () => (
                                <NodataMenu>
                                    <svg width="80" height="60" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><title>No data</title><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6"></path><g transform="translate(149.65 15.383)" fill="#FFF"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>
                                    <p>No data</p>
                                </NodataMenu>
                            )}
                        >
                            <DropDownButton>
                                <p>Worked</p>
                                <MdOutlineKeyboardArrowDown color={'#44546F'} />
                            </DropDownButton>
                        </Dropdown>
                    </div>
                </div>
                <div className={'secondNavigation'} ref={containerRef}>
                    <Popover
                        title={`Result search: ${tasksSearch?.pagination?.total || 0}`}
                        open={isFocused}
                        arrow={false}
                        content={renderContentSearch()}
                        overlayClassName={'contentSearch'}
                        trigger={'focus'}
                        placement={"bottomLeft"}
                        getPopupContainer={triggerNode => triggerNode}
                    >
                        <div>
                            <Input
                                style={{
                                    width: isFocused ? 420 : 'auto'
                                }}
                                value={query.search}
                                placeholder="Search tasks"
                                suffix={<MdOutlineSearch fontSize={20} color={'#637381'} />}
                                onChange={onChangeSearch}
                                onFocus={onFocus}
                                // onBlur={onBlur}
                            />
                        </div>
                    </Popover>
                    <Popover
                        title={<TitleListNoties>Notifications <SyncOutlined title={'Sync notifications'} onClick={(e) => fetchNoties(e)} spin={isLoadingGetNoti} /></TitleListNoties>}
                        open={isOpenNoti}
                        arrow={false}
                        content={renderContentNoti()}
                        overlayClassName={'contentNoti'}
                        trigger={'click'}
                        placement={"bottomLeft"}
                        getPopupContainer={triggerNode => triggerNode}
                    >
                        <div className={'item-nav'} onClick={() => {
                            setIsOpenNoti(prev => !prev)
                            if (isFocused) {
                                setIsFocused(false);
                            }
                        }}>
                            <Badge dot={noties?.pagination?.unreadCount} size={"small"}>
                                <MdNotifications color={'#637381'} fontSize={24} />
                            </Badge>
                        </div>
                    </Popover>
                    </div>
                <Dropdown
                    menu={{
                        items,
                        onClick: ({item, key, keyPath, domEvent}) => onCLickItemMenu({item, key, keyPath, domEvent})
                    }}
                    placement="bottomLeft"
                    arrow={false}
                >
                    <div>
                        <AvatarCustom size={32} name={me?.user_name || ''} src={me.avatar} />
                    </div>
                </Dropdown>
            </NavigationWrapper>
            <Suspense fallback={<Loader />}>
                <div style={{ paddingTop: '56px', height: '100%', width: '100%' }}>
                    <Switch>
                        <Route exact={true} path={'/home'} >
                            <Home />
                        </Route>
                        <Route exact={true} path={'/profile'} >
                            <Profile />
                        </Route>
                        {me?.role && (
                            <Route path={'/admin'} >
                                <DashboardAdmin />
                            </Route>
                        )}
                        <Dashboard />
                    </Switch>
                </div>
            </Suspense>
        </MainLayout>
    );
};

export default React.memo(PrivateScreens)