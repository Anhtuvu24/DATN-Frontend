import React, {useState} from 'react';
import { Splitter, Breadcrumb, Button, Input } from 'antd';

// Images
import testImage from '../../assets/images/LoginBanner1.png';

// Styles
import {
    EditDescriptionWrapper,
    FileDetailContainer,
    MainContentWrapper,
    DescriptionWrapper,
    DescriptionContent, NameTask,
} from "./local.styles.js";
import CKEditorCustom from "../../components/CKEditor";

const exampleHtml = '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>';

function FileDetail() {
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [nameTask, setNameTask] = useState('Lỗi tự động quay lại tổ chức mặc định khi đăng nhập trên Docbase');

    const itemsBreadcrumb = [
        {
            title: 'Project',
        },
        {
            title: 'Software Development',
        },
        {
            title: 'SD-1',
        },
    ];

    const onDoubleClickDescription = () => {
        setIsEditDescription(true);
    };

    const onChangeNameTask = (e) => {
        setNameTask(e.target.value);
    };

    const onBlueChangeName = (e) => {
        console.log(e.target.value)
    }

    return (
        <FileDetailContainer>
            <Splitter
                style={{
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Splitter.Panel defaultSize="70%" min="50%" max="90%">
                    <MainContentWrapper>
                        <Breadcrumb items={itemsBreadcrumb} />
                        <NameTask
                            placeholder="Filled"
                            variant="filled"
                            value={nameTask}
                            onChange={onChangeNameTask}
                            onBlur={onBlueChangeName}
                        />
                        <DescriptionWrapper>
                            <h2>Description</h2>
                            {isEditDescription ? (
                                <EditDescriptionWrapper>
                                    <CKEditorCustom content={exampleHtml} />
                                    <div className={'btnsEditWrapper'}>
                                        <Button type={"primary"}>Save</Button>
                                        <Button>Cancel</Button>
                                    </div>
                                </EditDescriptionWrapper>
                            ) : (
                                <DescriptionContent onDoubleClick={onDoubleClickDescription} dangerouslySetInnerHTML={{ __html: exampleHtml }} />
                            )}
                        </DescriptionWrapper>
                        <div className={'attachmentsTaskWrapper'}>
                            <img width={137} height={140} src={testImage} alt={'Attachment image'} />
                            <img width={137} height={140} src={testImage} alt={'Attachment image'} />
                            <img width={137} height={140} src={testImage} alt={'Attachment image'} />
                        </div>
                    </MainContentWrapper>
                </Splitter.Panel>
                <Splitter.Panel>
                </Splitter.Panel>
            </Splitter>
        </FileDetailContainer>
    )
}

export default React.memo(FileDetail);