import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import { userContext } from "../_app";
import { useRouter } from "next/router";
import { getFromServer } from "../../src/utils/server";


const Jackpot = ({ Component, pageProps }) => {

    return (
        <>
            <h1>Page Vierge</h1>
        </>
    );
};

Jackpot.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default Jackpot;