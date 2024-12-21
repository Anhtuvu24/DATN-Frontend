import React from 'react';
import {useInView} from "react-intersection-observer";
import AvatarCustom from "../../components/AvatarCustom/index.jsx";
import {timeAgo} from "../../utils/helper.js";
import Priority from "../../components/Priority/index.jsx";
import {GoDotFill} from "react-icons/go";
import {updateAction} from "../../redux/main/actions/action.js";
import createNotification from "../../utils/notificationHelper.js";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

function NotiItemSearch({ item, setIsOpenNoti }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const { userAction, task, comment, type_agent } = item;
    const statuses = useSelector(state => state.main.entities.status.statuses) || [];
    const statusName = statuses.find(item => item.id === task.id_status)?.name;

    const onClickMark = async (e, id, type) => {
        e.stopPropagation();
        const res = await dispatch(updateAction(id, { is_read: type }));
        if (res.status !== 200) {
            createNotification('error', 'Have an error!');
        }
    }

    const onClickNotiItem = (item) => {
        const { task, type_agent, comment } = item;
        const { id: id_task, sprint } = task;
        const { project } = sprint;
        if (!item.is_read) {
            dispatch(updateAction(item.id, { is_read: true }));
        }
        if (type_agent === 'comment') {
            history.push(`/project/${project.id}/task/${id_task}`, { id_comment_select: comment?.id });
        } else {
            history.push(`/project/${project.id}/task/${id_task}`);
        }
        setIsOpenNoti(false);
    }

    return (
        type_agent === 'task' ? (
            <div ref={ref} className={'notiItem'} key={item.id} onClick={() => onClickNotiItem(item)}>
                {inView && (
                    <>
                        <div className={'boxAvatar'}>
                            <AvatarCustom size={32} name={userAction.user_name} src={userAction.avatar} />
                        </div>
                        <div className={'notiContent'}>
                            <p className={'notiName'} title={item.name}>{item.name}<span>{timeAgo(item?.created_at)}</span></p>
                            <p className={'taskName'} title={task.name}><Priority type={task?.priority} />{task.name}</p>
                            <p className={'noTask'}>{task.no_task} • {statusName}</p>
                        </div>
                        <div className={'buttonRead'}>
                            {item.is_read ? (
                                <div onClick={(e) => onClickMark(e, item.id, !item.is_read)} className={'isRead'} title={'Mark as unread'} />
                            ) : (
                                <GoDotFill onClick={(e) => onClickMark(e, item.id, !item.is_read)} fontSize={20} color={'#0052CC'} title={'Mark as read'} />
                            )}
                        </div>
                    </>
                )}
            </div>
        ) : (
            <div ref={ref} className={'notiItem'} key={item.id} onClick={() => onClickNotiItem(item)}>
                {inView && (
                    <>
                        <div className={'boxAvatar'}>
                            <AvatarCustom size={32} name={userAction.user_name} src={userAction.avatar} />
                        </div>
                        <div className={'notiContent'}>
                            <p className={'notiName'} title={item.name}>{item.name} • {task.no_task} <span>{timeAgo(item?.created_at)}</span></p>
                            <p className={'commentContent'}>{comment?.text}</p>
                        </div>
                        <div className={'buttonRead'}>
                            {item.is_read ? (
                                <div onClick={(e) => onClickMark(e, item.id, !item.is_read)} className={'isRead'} title={'Mark as unread'} />
                            ) : (
                                <GoDotFill onClick={(e) => onClickMark(e, item.id, !item.is_read)} fontSize={20} color={'#0052CC'} title={'Mark as read'} />
                            )}
                        </div>
                    </>
                )}
            </div>
        )
    )
}

export default React.memo(NotiItemSearch)