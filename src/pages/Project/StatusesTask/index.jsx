import React, { useState } from 'react';

// Styles
import { StatusesWrapper } from './local.styles.js';
import StatusItem from "../StatusItem/index.jsx";
import {useSelector} from "react-redux";

function StatusesTask({ isScrolled }) {
    const categories = useSelector(state => state.main.entities.status?.statuses);
    return (
        <StatusesWrapper>
            {categories.map((item, index) => {
                return (
                    <StatusItem isScrolled={isScrolled} status={item} key={index} />
                )
            })}
        </StatusesWrapper>
    )
}

export default React.memo(StatusesTask);