import {Collapse, DatePicker, Select, Skeleton} from "antd";
import {
    DetailsWrapper,
    LabelStatusItem,
    PriorityOption,
    SelectOptionItem
} from "../../../../components/TaskInforDetail/local.styles.js";
import Priority from "../../../../components/Priority/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {updateTask} from "../../../../redux/main/actions/task.js";
import createNotification from "../../../../utils/notificationHelper.js";
import {MdKeyboardArrowDown} from "react-icons/md";
import AvatarCustom from "../../../../components/AvatarCustom/index.jsx";
import dayjs from "dayjs";
import {timeAgo} from "../../../../utils/helper.js";

const { Panel } = Collapse;
const { Option } = Select;

const priorityOption = [
    {
        value: 'low',
        label: <PriorityOption><Priority type={'low'} />Low</PriorityOption>
    },
    {
        value: 'medium',
        label: <PriorityOption><Priority type={'medium'} />Medium</PriorityOption>
    },
    {
        value: 'high',
        label: <PriorityOption><Priority type={'high'} />High</PriorityOption>
    },
]

function TaskInforDetail({ taskId, idProject, loading }) {
    const dispatch = useDispatch();
    const task = useSelector(state => state.main.entities.task.currentTask) || {};
    const {
        sprint,
        id_status,
        id_assignee,
        id_reporter,
        no_task,
        name,
        description,
        priority,
        expired_at,
        created_at,
        updated_at,
        files
    } = task || {};
    const [statusValue, setStatusValue] = useState(null);
    const me = useSelector(state => state.main.entities.auth.user) || {};
    const { users = [], all = {} } = useSelector(state => state.main.entities.user) || {};
    const assignee = all[id_assignee];
    const reporter = all[id_reporter];
    const statuses = useSelector(state => state.main.entities.status.statuses) || [];
    const optionStatus = statuses.map((item, index) => {
        const colorBGStatus = item.name === "TO DO" ? '#091E420F' :item.name === 'DONE' ? '#DCFFF1' : '#E9F2FF';
        const colorStatus = item.name === "TO DO" ? '#44546F' :item.name === 'DONE' ? '#216E4E' : '#0055CC';
        return {
            value: item.id,
            label: <LabelStatusItem bgColor={colorBGStatus} color={colorStatus}>{item.name}</LabelStatusItem>,
        }
    })

    const itemStatusSelect = statuses.find(item => item.id === statusValue);
    const colorItem = itemStatusSelect?.name === 'TO DO' ? { color: '#44546F', bgColor: '#091E420F'}
        : itemStatusSelect?.name === 'DONE' ? { color: '#216E4E', bgColor: '#DCFFF1'}
            : { color: '#0055CC', bgColor: '#E9F2FF'};

    useEffect(() => {
        if (!loading) {
            setStatusValue(id_status);
        }
    }, [loading])

    const onChange = async (value) => {
        setStatusValue(value);
        const res = await dispatch(updateTask(taskId, { id_status: value }));
        if (res.status !== 200) {
            createNotification('error', 'Updated status fail');
        }
    };

    const onChangeAssignee = async (value) => {
        const res = await dispatch(updateTask(taskId, { id_assignee: value }));
        if (res.status !== 200) {
            createNotification('error', 'Changed assignee fail');
        }
    }

    const onChangeExpired = async (date, dateString) => {
        const res = await dispatch(updateTask(taskId, { expired_at: dateString }));
        if (res.status !== 200) {
            createNotification('error', 'Changed expired fail');
        }
    }

    const onChangePriority = async (value) => {
        const res = await dispatch(updateTask(taskId, { priority: value }));
        if (res.status !== 200) {
            createNotification('error', 'Changed priority fail');
        }
    }

    return (
        <DetailsWrapper color={colorItem.color} bgColor={colorItem.bgColor}>
            {loading ? (
                <Skeleton.Button active={true} />
            ) : (
                <div>
                    <Select
                        value={statusValue}
                        className={'selectStatus'}
                        placeholder="Select status"
                        optionFilterProp="label"
                        suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                        onChange={onChange}
                        options={optionStatus}
                        getPopupContainer={trigger => trigger}
                        popupClassName={'listStatusWrapper'}
                    />
                </div>
            )}
            <Collapse
                expandIconPosition={'end'}
                defaultActiveKey={['1']}
                expandIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
            >
                <Panel header="Details" key="1">
                    <div className={'detailItem'}>
                        <p>Assignee</p>
                        {loading ? (
                            <Skeleton.Button active={true} />
                        ) : (
                            <Select
                                onChange={onChangeAssignee}
                                defaultValue={assignee?.id}
                                style={{ height: 40 }}
                                suffixIcon={false}
                                showSearch={true}
                            >
                                {users.map(item => {
                                    return (
                                        <Option value={item.id} key={item?.id}>
                                            <SelectOptionItem>
                                                <AvatarCustom size={24} name={item?.user_name} src={item?.avatar} />
                                                <p>{item?.user_name}</p>
                                            </SelectOptionItem>
                                        </Option>
                                    )
                                })}
                            </Select>
                        )}
                    </div>
                    <div className={'detailItem'}>
                        <p>Sprint</p>
                        <div>
                            {loading ? (
                                <Skeleton.Button active={true} />
                            ) : (
                                <p className={'sprintName'}>{sprint.name}</p>
                            )}
                        </div>
                    </div>
                    <div className={'detailItem'}>
                        <p>Priority</p>
                        <div>
                            {loading ? (
                                <Skeleton.Button active={true} />
                            ) : (
                                <Select
                                    defaultValue={priority}
                                    onChange={onChangePriority}
                                    options={priorityOption}
                                    getPopupContainer={trigger => trigger}
                                    popupClassName={'priorityOption'}
                                />
                            )}
                        </div>
                    </div>
                    <div className={'detailItem'}>
                        <p>Deadline time estimate</p>
                        {loading ? (
                            <div>
                                <Skeleton.Button active={true} />
                            </div>
                        ) : (
                            <DatePicker onChange={onChangeExpired} defaultValue={dayjs(expired_at)} style={{ height: 40 }} />
                        )}
                    </div>
                    <div className={'detailItem'}>
                        <p>Reporter</p>
                        <div className={'reporterWrapper'}>
                            {loading ? (
                                <>
                                    <Skeleton.Avatar size={24} active={true} />
                                    <Skeleton.Button active={true} />
                                </>
                            ) : (
                                <>
                                    <AvatarCustom size={24} name={reporter?.user_name} src={reporter?.avatar} />
                                    <p>{reporter?.user_name}</p>
                                </>
                            )}
                        </div>
                    </div>
                </Panel>
            </Collapse>
            <div className={'createUpdateTime'}>
                {loading ? (
                    <>
                        <Skeleton.Input size={"small"} active={true} />
                        <Skeleton.Input size={"small"} active={true} />
                    </>
                ) : (
                    <>
                        <p>Created {dayjs(created_at, 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY [at] h:mm A')}</p>
                        <p>Updated {timeAgo(updated_at)}</p>
                    </>
                )}
            </div>
        </DetailsWrapper>
    )
}

export default React.memo(TaskInforDetail);