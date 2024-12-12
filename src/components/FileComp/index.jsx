import React, {useEffect, useMemo, useState} from 'react';
import {Avatar, Image, Popconfirm, Skeleton} from "antd";
import { MdOutlineDownload } from "react-icons/md";
import {IoMdTrash} from "react-icons/io";

// Styles
import { FileCompWrapper } from "./local.styles.js";

// Images
import fileUnknown from '../../assets/images/file.svg';

// Utils
import {getFileInfo} from "../../utils/firebase.js";
import {determineFileType} from "../../utils/helper.js";
import {useDispatch} from "react-redux";
import {deleteFile} from "../../redux/main/actions/file.js";
import createNotification from "../../utils/notificationHelper.js";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TYPE_FILES = {
    Image: 'Image',
    Video: 'Video',
    Audio: 'Audio',
    PDF: 'PDF Document',
    Office: 'Office Document',
    Text: 'Text Document',
    Other: 'Other',
    Unknown: 'Unknown',
}

function FileComp({ file, size }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [fileInfo, setFileInfo] = useState(null);
    const { url } = file;
    const typeFile = fileInfo && determineFileType(fileInfo?.metadata || {});

    useEffect(() => {
        const getUrl = async () => {
            try {
                const infoFile = await getFileInfo(url);
                setFileInfo(infoFile);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        if (file) {
            getUrl();
        }
    }, [file])

    const downloadFile = async (e, url) => {
        e.stopPropagation();
        try {
            const response = await fetch(url); // Fetch file từ URL
            const blob = await response.blob(); // Chuyển đổi response thành Blob
            const blobUrl = URL.createObjectURL(blob); // Tạo URL tạm thời cho Blob

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileInfo?.metadata?.name || 'downloaded-file'; // Đặt tên file mong muốn
            link.click();

            // Hủy URL tạm thời sau khi tải
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Failed to download file:', error);
        }
    };

    const onDeleteFile = async () => {
        const res = await dispatch(deleteFile(file.id));
        if (res.status === 200) {
            createNotification('success', 'File deleted successfully');
        } else {
            createNotification('error', 'File deleted fail');
        }
    }

    return (
        <>
            {(!fileInfo && loading) ? (
                <Skeleton.Image style={{ width: size, height: size }} />
            ) : (
                <FileCompWrapper title={file.name} className={'attachment'} size={size}>
                    {typeFile === TYPE_FILES.Image ? (
                        <Image style={{ width: size, height: size }} src={fileInfo.url} alt={'Attachment image'} />
                    ) : (
                        <Image preview={false} style={{ width: size, height: size }} src={fileUnknown} alt={'Attachment image'} />
                    )}
                    <div className={'downloadBtn'} onClick={(e) => downloadFile(e, fileInfo.url)}>
                        <MdOutlineDownload fontSize={18} color={'#ccc'} />
                    </div>
                    <Popconfirm title={'Delete this file?'} onConfirm={onDeleteFile}>
                        <div className={'removeBtn'}>
                            <IoMdTrash fontSize={18} color={'#f3545d'} />
                        </div>
                    </Popconfirm>
                    <div className={'inforFile'}>
                        <p title={file.name}>{file.name}</p>
                        <p title={dayjs(file?.created_at, 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY [at] h:mm A')}>
                            {dayjs(file?.created_at, 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY [at] h:mm A')}
                        </p>
                    </div>
                </FileCompWrapper>
            )}
        </>
    )
}

export default React.memo(FileComp);