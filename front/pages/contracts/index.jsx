import React, {useEffect, useState} from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";


import {Avatar, Link, Table, TableContainer, Tbody, Td, Tr} from '@chakra-ui/react';

import {getFromServer, postOnServer} from "../../src/utils/server";
import NextLink from "next/link";
import styles from "./index.module.scss";

const Index = ({Component, pageProps}) => {

    const [contractsList, setContractsList] = useState([]);

    useEffect(() => {
        getFromServer('contracts').then((contractsList) => {
            setContractsList(contractsList.data);
        })
            .catch(error => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        console.log(contractsList);

    }, [contractsList])

    function updateContract() {
        return true;
    }

    function signContract() {
        return true;
    }

    function cloneContract() {
        console.log('cloneContract ok')
    }


    return (
        <div className={styles.contractContainer}>
            <TableContainer>
                <Table variant='simple' className={styles.contractTable}>
                    <Tbody>
                        {
                            contractsList.map((contract) => (
                                    <Tr key={contract.id} className={styles.childContainer}>
                                        <Td><Avatar size='sm' bg='teal.500'/></Td>
                                        <Td>{contract.child.firstname}</Td>
                                        <Td>{contract.weeklyPoint} POINT</Td>
                                        <Td>
                                            <NextLink href={"../contract/evaluate/" + contract.child.id} passHref>
                                                <Link>Évaluer</Link>
                                            </NextLink>
                                        </Td>
                                        <Td>
                                            <NextLink href={"../contract/" + contract.id} passHref>
                                                <Link>Contrat</Link>
                                            </NextLink>
                                        </Td>
                                    </Tr>
                                )
                            )
                        }
                    </Tbody>
                </Table>
            </TableContainer>

        </div>
    );
};

Index.getLayout = function getLayout(Index) {
    return <DashboardLayout>{Index}</DashboardLayout>;
};

export default Index;