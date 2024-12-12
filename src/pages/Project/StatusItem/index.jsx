import React from 'react';

// Styles
import { StatusItemWrapper } from './local.styles.js';

function StatusItem({ status, isScrolled }) {
    return (
        <StatusItemWrapper isScrolled={isScrolled}>
            <p>{status.name}</p>
        </StatusItemWrapper>
    )
}

export default React.memo(StatusItem);