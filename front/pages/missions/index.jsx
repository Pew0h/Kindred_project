import React from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";


const MissionsPage = ({ Component, pageProps }) => {

    return (
        <>
        <h1>Mes missions</h1>
        </>
    );
};

MissionsPage.getLayout = function getLayout(MissionsPage) {
    return <DashboardLayout>{MissionsPage}</DashboardLayout>;
};

export default MissionsPage;