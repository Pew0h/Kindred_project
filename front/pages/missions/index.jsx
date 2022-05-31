import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { getAllMissionsByUserId } from '../../src/libs/api';
import useSWR from 'swr'
import { useSWRConfig } from 'swr'
import { fetcher } from "../../src/libs/utils";
import mainStyles from '../../styles/main.module.scss';
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";

//CHAKRA UI IMPORTS
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'


const MissionsPage = ({ Component, pageProps }) => {
    const { cache, mutate, ...extraConfig } = useSWRConfig();
    const { data, error } = useSWR('https://run.mocky.io/v3/79dd13e8-d224-402d-b43e-94dbbb3d1a11', fetcher);
    console.log(cache)
    if (error) return <p>Chargement echoué...</p>;
    if (!data) return <h1>Chargement ..</h1>;
    console.log(data)
    return (
        <>
            <h1>Mes missions</h1>
            <div className={styles.content}>
                <TableContainer className={mainStyles.tableContainer}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Nom</Th>
                                <Th>Points à gagner</Th>
                                <Th>Catégorie</Th>
                                <Th>Date de fin</Th>
                                <Th>Créé par</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map(mission => {
                                return <Tr>
                                    <Td>{mission.name} </Td>
                                    <Td>{mission.points}</Td>
                                    <Td>{mission.category.name}</Td>
                                    <Td>{mission.endDate}</Td>
                                    <Td>{mission.parent.firstname} {mission.parent.lastname}</Td>
                                </Tr>
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

MissionsPage.getLayout = function getLayout(MissionsPage) {
    return <DashboardLayout>{MissionsPage}</DashboardLayout>;
};

export default MissionsPage;