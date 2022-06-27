import React, {useContext, useState} from "react";
import DashboardLayout from "../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import {userContext} from "./_app";

const Index = ({ Component, pageProps }) => {

    const {user: {token}} = useContext(userContext);

    return (
        <>
            <div className={styles.container}>

            </div>
        </>
    );
};

Index.getLayout = function getLayout(Index) {
    return <DashboardLayout>{Index}</DashboardLayout>;
};

export default Index;