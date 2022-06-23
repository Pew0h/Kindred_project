import React, {useState, useEffect} from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import {useRouter} from "next/router";
import {getFromServer} from "../../../src/utils/server";
import {Heading, Link} from "@chakra-ui/react";
import styles from "./index.module.scss";
import NextLink from "next/link";


const ChildContractsList = ({ Component, pageProps }) => {

    const [childrenContractsList, setChildrenContractsList] = useState([]);
    const [children, setChildren] = useState({});

    const {
        query: {id: childrenId},
    } = useRouter();

    useEffect(() => {
        getFromServer('contracts').then((allContractsList) => {
            setChildrenContractsList(allContractsList.data.filter((contract) =>
                contract.child.id === parseInt(childrenId.toString())
            ));
        });

        getFromServer('users').then((usersList) => {
            setChildren(usersList.data.find((user) =>
                user.id === parseInt(childrenId.toString())
            ));
        });
    }, [childrenId]);

    return (
        <>
            <div className={styles.contractsListContainer}>
                <Heading as='h3' size='lg'>Contrats de {children.firstname}</Heading>
                {
                    childrenContractsList.map((contract) => (
                        <div key={contract.id} className={styles.contractsListBoxContent}>
                            <NextLink href={"/contract/" + contract.id} passHref>
                                <Link>Contrat numéro {contract.id}</Link>
                            </NextLink>
                        </div>
                        )
                    )
                }
            </div>

        </>
    );
};

ChildContractsList.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default ChildContractsList;