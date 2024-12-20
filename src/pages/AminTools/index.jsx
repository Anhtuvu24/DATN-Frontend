import React, {lazy, Suspense, useEffect} from 'react'
import { Splitter } from "antd";

// Components
import AdminToolRoutes from "./AdminToolRoutes.jsx";
import Sidebar from "../../components/SidebarAdmin";
import {useSelector} from "react-redux";

function Dashboard() {
    return (
        <Splitter>
            <Splitter.Panel collapsible={true} defaultSize={300} min={'10%'} max={400}>
                <Sidebar />
            </Splitter.Panel>
            <Splitter.Panel>
                <AdminToolRoutes />
            </Splitter.Panel>
        </Splitter>
    );
};

export default React.memo(Dashboard)