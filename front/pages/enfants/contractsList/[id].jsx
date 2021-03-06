import React, { useContext, useState, useEffect } from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { userContext } from "../../_app";
import { getFromServer } from "../../../src/utils/server";
import { Heading, Link } from "@chakra-ui/react";
import styles from "./index.module.scss";
import NextLink from "next/link";


const ChildContractsList = ({ Component, pageProps }) => {

    const [childrenContractsList, setChildrenContractsList] = useState([]);
    const [children, setChildren] = useState({});

    // On récupère l'utilisateur courant
    const { user: { firstname, id, role } } = useContext(userContext);

    const {
        query: {id: childrenId},
    } = useRouter();

    const router = useRouter();
    const handleAddContract = () => {
        router.push(`/contract/addContract/`);
    };

    useEffect(() => {
        getFromServer('contracts').then((allContractsList) => {
            setChildrenContractsList(allContractsList.data.filter((contract) =>
                contract.child.id === parseInt(childrenId.toString())
            ));
        });

        getFromServer('users').then((usersList) => {
            setChildren(usersList?.data.find((user) =>
                user.id === parseInt(childrenId.toString())
            ));
        });
    }, [childrenId]);

    return (
        <>
            <div className={styles.contractsListContainer}>
                {role == 'ROLE_PARENT' ?
                    <Heading as='h3' size='lg'>Contrats de {children.firstname}</Heading>
                    :
                    <Heading as='h3' size='lg'>Mes contrats</Heading>
                }
                {childrenContractsList.length > 0 ?
                    childrenContractsList.map((contract) => (
                        <div key={contract.id} className={styles.contractsListBoxContent}>
                            <NextLink href={"/contract/" + contract.id} passHref>
                                <Link>
                                    <div className={styles.contract}>
                                        <span>Contrat n°{contract.id}</span>
                                        <span className={styles.status}>
                                            {contract.status.name}
                                        </span>
                                    </div>
                                </Link>
                            </NextLink>
                        </div>
                    ))
                    :
                    <div className={styles.contractsListBoxContent}>
                        <div>
                            <p>Aucun contrat</p>
                        </div>
                    </div>
                }
                {role == 'ROLE_PARENT' &&
                    <div className={styles.addContractContainer} onClick={handleAddContract}>
                        Ajouter un nouveau contrat
                    </div>
                }
            </div>

        </>
    );
};

ChildContractsList.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default ChildContractsList;