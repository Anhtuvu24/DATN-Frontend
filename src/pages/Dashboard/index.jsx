import React, { lazy, Suspense } from 'react'
import { Splitter } from "antd";

// Components
import DashboardRoutes from "./DashboardRoutes.jsx";
import Sidebar from "../../components/Sidebar/index.jsx";

function Dashboard() {

    return (
        <Splitter
            style={{
                height: 'calc(100% - 56px)',
            }}
        >
            <Splitter.Panel defaultSize={400} min="10%" max="70%">
                <Sidebar />
            </Splitter.Panel>
            <Splitter.Panel>
                <DashboardRoutes />
            </Splitter.Panel>
        </Splitter>
    );
};

export default React.memo(Dashboard)