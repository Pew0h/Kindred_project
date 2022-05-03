import React from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
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
import styles from './index.module.scss';

import { getContractById } from '../../src/libs/api';

import { Button, ButtonGroup } from '@chakra-ui/react';

const Index = ({ Component, pageProps }) => {
    const contract = getContractById(1);

    function updateContract(){
        return true;
    }
    function signContract(){
        return true;
    }
    function cloneContract(){
        console.log('cloneContract ok')
    }


    return (
        <>
            <h1>Contract</h1>
            <Button colorScheme='blue' onClick={cloneContract}>Cloner</Button>
            {/* <TableContainer className={styles.table_custom}>
                <Table variant='simple'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer> */}
        </>
    );
};

Index.getLayout = function getLayout(Index) {
    return <DashboardLayout>{Index}</DashboardLayout>;
};

export default Index;