import React, {useState} from 'react';
import {Avatar, Collapse, DatePicker, Select} from 'antd';
import { MdKeyboardArrowDown } from "react-icons/md";

// Styles
import { DetailsWrapper, LabelStatusItem, SelectOptionItem } from "./local.styles.js";

const fakeOption = [
    {
        value: 'todo',
        label: <LabelStatusItem bgColor={'#091E420F'} color={'#44546F'}>TO DO</LabelStatusItem>,
    },
    {
        value: 'inProgress',
        label: <LabelStatusItem bgColor={'#E9F2FF'} color={'#0055CC'}>IN PROGRESS</LabelStatusItem>,
    },
    {
        value: 'readyForTest',
        label: <LabelStatusItem bgColor={'#E9F2FF'} color={'#0055CC'}>READY FOR TEST</LabelStatusItem>,
    },
    {
        value: 'done',
        label: <LabelStatusItem bgColor={'#DCFFF1'} color={'#216E4E'}>DONE</LabelStatusItem>,
    }
]

const { Panel } = Collapse;

function TaskInforDetail({ status= 'todo' }) {
    const [statusValue, setStatusValue] = useState(status);
    const colorItem = statusValue === 'todo' ? { color: '#44546F', bgColor: '#091E420F'}
        : statusValue === 'done' ? { color: '#216E4E', bgColor: '#DCFFF1'}
        : { color: '#0055CC', bgColor: '#E9F2FF'};

    const onChange = (value) => {
        setStatusValue(value);
    };

    return (
        <DetailsWrapper color={colorItem.color} bgColor={colorItem.bgColor}>
            <div>
                <Select
                    value={statusValue}
                    className={'selectStatus'}
                    placeholder="Select status"
                    optionFilterProp="label"
                    suffixIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
                    onChange={onChange}
                    options={fakeOption}
                    getPopupContainer={trigger => trigger}
                    popupClassName={'listStatusWrapper'}
                />
            </div>
            <Collapse
                expandIconPosition={'end'}
                defaultActiveKey={['1']}
                expandIcon={<MdKeyboardArrowDown fontSize={20} color={'#637381'} />}
            >
                <Panel header="Details" key="1">
                    <div className={'detailItem'}>
                        <p>Assignee</p>
                        <Select defaultValue={'apple'} style={{ height: 40 }} suffixIcon={false} showSearch={true}>
                            <Option value="apple">
                                <SelectOptionItem>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/datn-1af41.firebasestorage.app/o/avatars%2F1732561620989-default-user.png?alt=media&token=eef741cb-385c-4d42-91cc-1d5eecf9ab74"
                                        alt="apple"
                                        style={{ marginRight: 8 }}
                                        width={24}
                                    />
                                    <p title={'Apple Apple AppleAppleApple Apple'}>Apple Apple AppleAppleApple Apple</p>
                                </SelectOptionItem>
                            </Option>
                            <Option value="banana">
                                <SelectOptionItem>
                                    <img
                                        src="https://via.placeholder.com/20"
                                        alt="banana"
                                        style={{ marginRight: 8 }}
                                        width={24}
                                    />
                                    <p title={'Banana'}>Banana</p>
                                </SelectOptionItem>
                            </Option>
                        </Select>
                    </div>
                    <div className={'detailItem'}>
                        <p>Sprint</p>
                        <div>
                            <p>SD Sprint 11</p>
                        </div>
                    </div>
                    <div className={'detailItem'}>
                        <p>Deadline time estimate</p>
                       <DatePicker style={{ height: 40 }} />
                    </div>
                    <div className={'detailItem'}>
                        <p>Reporter</p>
                        <div className={'reporterWrapper'}>
                            <Avatar size={24}>VT</Avatar>
                            <p>Nguyen Manh Cuong</p>
                        </div>
                    </div>
                </Panel>
            </Collapse>
            <div className={'createUpdateTime'}>
                <p>Created October 30, 2024 at 11:24 AM</p>
                <p>Updated 3 days ago</p>
            </div>
        </DetailsWrapper>
    )
}

export default React.memo(TaskInforDetail);