import React, { useEffect, useState } from 'react';
import { Avatar, Skeleton } from "antd";
import { stringAvatar } from "../../utils/helper.js";
import { getFileInfo } from "../../utils/firebase.js";

const avatarCache = {};

function AvatarCustom({ size = 24, type = 'circle', name = '', src }) {
    const [loading, setLoading] = useState(true);
    const [fileInfo, setFileInfo] = useState(null);
    const configAvatar = name && stringAvatar(name);
    const { bgcolor, children } = configAvatar || {};

    useEffect(() => {
        const fetchAvatar = async () => {
            if (avatarCache[src]) {
                setFileInfo(avatarCache[src]);
                setLoading(false);
            } else {
                try {
                    const infoFile = await getFileInfo(src);
                    avatarCache[src] = infoFile;
                    setFileInfo(infoFile);
                    setLoading(false);
                } catch (e) {
                    setLoading(false);
                }
            }
        };

        if (src) {
            fetchAvatar();
        } else {
            setFileInfo(null);
            setLoading(false);
        }
    }, [src]);

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
    );
}

export default AvatarCustom;