import React, {useEffect, useState} from 'react';
import {Avatar, Collapse, DatePicker, Select, Skeleton} from 'antd';
import { MdKeyboardArrowDown } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
// Styles
import { DetailsWrapper, LabelStatusItem, SelectOptionItem } from "./local.styles.js";

// Utils
import {timeAgo} from "../../utils/helper.js";
import AvatarCustom from "../AvatarCustom/index.jsx";
import {updateTask} from "../../redux/main/actions/task.js";
import {useParams} from "react-router-dom";
import createNotification from "../../utils/notificationHelper.js";

const { Panel } = Collapse;
const { Option } = Select;

function TaskInforDetail({ loading }) {
    const dispatch = useDispatch();
    const params = useParams();
    const {id: taskId, idProject } = params;
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