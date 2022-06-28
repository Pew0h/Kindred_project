import React, {useContext, useEffect, useState} from "react";
import DashboardLayout from "../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import {userContext} from "./_app";
import {Router, useRouter} from "next/router";

const Index = ({ Component, pageProps }) => {

    const {user: {token}} = useContext(userContext);
    const router = useRouter();

    useEffect(() => {
        const { pathname } = Router;
        if (pathname === "/" || pathname === undefined) {
            router.push("/dashboard/");
        }
    });

    return (
        <>
            <div className={styles.container}>
                Index
            </div>
        </>
    );
};

Index.getLayout = function getLayout(Index) {
    return <DashboardLayout>{Index}</DashboardLayout>;
};

export default Index;