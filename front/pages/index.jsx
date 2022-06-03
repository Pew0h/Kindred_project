//CHAKRA UI IMPORTS|
import {
    Table, TableContainer, Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react';
import React from "react";
import DashboardLayout from "../src/layouts/DashboardLayout/DashboardLayout";
import { getUser, getUserChilds } from '../src/libs/api';
import mainStyles from '../styles/main.module.scss';
import styles from "./index.module.scss";

const MissionsPage = ({ user, test, childs }) => {
    return (
        <>
            <h1 className={styles.h1_title}>Accueil</h1>
            <div className={styles.content}>
                <div className={styles.subContent}>
                    <h2 className={styles.h2_title}>Enfants</h2>
                    <TableContainer className={mainStyles.tableContainer}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Prénom</Th>
                                    <Th>Nom</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {childs.map(child => {
                                    return <Tr>
                                              <Td>{child.firstname}</Td>
                                        <Td>{child.lastname} </Td>       
                                    </Tr>
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={styles.subContent}>
                    <h2 className={styles.h2_title}>Enfants</h2>
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
                                {/* {allMissionsByUserId.map(mission => {
                                    return <Tr>
                                        <Td>{mission.name} </Td>
                                        <Td>{mission.points}</Td>
                                        <Td>{mission.category.name}</Td>
                                        <Td>{mission.endDate}</Td>
                                        <Td>{mission.parent.firstname} {mission.parent.lastname}</Td>
                                    </Tr>
                                })} */}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </>
    );
};
export async function getServerSideProps(context) {
    const userId = 3;
    const user = await getUser(userId);
    const userData = JSON.stringify(user);
    const childs = await getUserChilds(userId);
    
    return {
        props: {
            user: userData,
            childs: childs

        },
    }
}

MissionsPage.getLayout = function getLayout(MissionsPage) {
    return <DashboardLayout>{MissionsPage}</DashboardLayout>;
};

export default MissionsPage;