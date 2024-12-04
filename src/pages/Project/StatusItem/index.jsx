import React from 'react';

// Styles
import { StatusItemWrapper } from './local.styles.js';

function StatusItem({ status, isScrolled }) {
    return (
        <StatusItemWrapper isScrolled={isScrolled}>
            <p>{status.title}</p>
        </StatusItemWrapper>
    )
}

export default React.memo(StatusItem);