import React, {useMemo} from 'react';

// Styles
import { FileCompWrapper } from "./local.styles.js";

function FileComp({ file, size }) {
    console.log(file)
    const urlImage = useMemo(() => {
        if (file && file.originFileObj) {
            return URL.createObjectURL(file.originFileObj)
        }
    }, []);

    return (
        <FileCompWrapper size={size}>
            <img src={urlImage} alt={'file image'} />
        </FileCompWrapper>
    )
}

export default React.memo(FileComp);