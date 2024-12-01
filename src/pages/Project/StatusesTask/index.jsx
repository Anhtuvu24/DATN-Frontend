import React, { useState } from 'react';

// Styles
import { StatusesWrapper } from './local.styles.js';
import StatusItem from "../StatusItem/index.jsx";

function StatusesTask({ categories }) {
    return (
        <StatusesWrapper>
            {categories.map((item, index) => {
                return (
                    <StatusItem status={item} key={index} />
                )
            })}
        </StatusesWrapper>
    )
}

export default React.memo(StatusesTask);