import { Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import Lottie from "react-lottie";
import DashboardLayout from "../src/layouts/DashboardLayout/DashboardLayout";
import loader from "../src/lotties/loader.json";
import styles from "./index.module.scss";

const Index = ({ Component, pageProps }) => {
    const [isDataLoading, setIsDataLoading] = useState(false);

    return (
        <>
            <div className={styles.container}>
                {isDataLoading ? <div className={styles.loader}><Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: loader,
                        rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice"
                        }
                    }}
                    height={200}
                    width={200}

                /></div> : <div className={styles.fadeinContent}>

                    <Heading as="h3" size="lg" style={{ marginBottom: '20px' }}>
                        Dashboard
                    </Heading>
                    <div className={styles.container}>


                    </div>
                </div>}
            </div>
        </>
    );
};

Index.getLayout = function getLayout(Index) {
    return <DashboardLayout>{Index}</DashboardLayout>;
};

export default Index;