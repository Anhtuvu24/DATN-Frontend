import React, {useEffect, useState} from 'react';
import {Avatar, Skeleton} from "antd";

// Utils
import {stringAvatar} from "../../utils/helper.js";
import {getFileInfo} from "../../utils/firebase.js";

function AvatarCustom({ size = 24, type = 'circle', name = '', src }) {
    const [loading, setLoading] = useState(true);
    const [fileInfo, setFileInfo] = useState(null);
    const configAvatar = name && stringAvatar(name);
    const { bgcolor, children } = configAvatar;

    useEffect(() => {
        const getUrl = async () => {
            try {
                const infoFile = await getFileInfo(src);
                setFileInfo(infoFile);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        if (src) {
            getUrl();
        } else {
            setFileInfo(null);
            setLoading(false);
        }
    }, [src])

    return (
        <>
            {loading ? (
                <Skeleton.Avatar size={size} shape={type} />
            ) : (
                <>
                    {(fileInfo && src) ? (
                        <Avatar size={size} src={fileInfo?.url} shape={type} />
                    ) : (
                        <Avatar size={size} style={{ backgroundColor: bgcolor }} shape={type}>{children}</Avatar>
                    )}
                </>
            )}
        </>
    )
}

export default AvatarCustom;