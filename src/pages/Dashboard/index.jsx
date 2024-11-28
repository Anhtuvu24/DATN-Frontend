import React, { lazy, Suspense } from 'react'

// Components
import Loader from '../../components/loader';
import DashboardRoutes from "./DashboardRoutes.jsx";

function Dashboard() {

    return (
        <div>
            <div className={'sidebar'}></div>
            <DashboardRoutes />
        </div>
    );
};

export default React.memo(Dashboard)