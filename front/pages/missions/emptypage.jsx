import React from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";


const EmptyPage = ({ Component, pageProps }) => {

    return (
        <>
        <h1>Page Vierge</h1>
        </>
    );
};

EmptyPage.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default EmptyPage;