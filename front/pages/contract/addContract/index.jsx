import React, {useState, useContext, useEffect} from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import {useRouter} from "next/router";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input, Select, Textarea,
    useToast
} from "@chakra-ui/react";
import {getFromServer, postOnServer} from "../../../src/utils/server";
import {userContext} from "../../_app";
import styles from "./index.module.scss";


const AddContractPage = ({ Component, pageProps }) => {

    const router = useRouter();
    const toast = useToast();

    // On récupère l'utilisateur courant
    const {user: {id}} = useContext(userContext)

    const [contractContent, setContractContent] = useState('');
    const handleContentChange = (e) => setContractContent(e.target.value);
    const isErrorContent = contractContent === '';

    const [contractChild, setContractChild] = useState('');
    const handleChildChange = (e) => setContractChild(e.target.value);
    const isErrorChild = contractChild === '';

    const [contractPoints, setContractPoints] = useState('');
    const handlePointsChange = (e) => setContractPoints(e.target.value);
    const isErrorPoints = contractPoints === '';

    const [contractDollarPerPoint, setContractDollarPerPoint] = useState('');
    const handleDollarPerPointChange = (e) => setContractDollarPerPoint(e.target.value);
    const isErrorDollarPerPoint = contractDollarPerPoint === '';

    // States pour récupérer des valeurs en base
    const [childrensList, setChildrensList] = useState([]);

    // Récupération data à la création du composant
    useEffect(() => {
        getFromServer('users').then((userList) => {
            setChildrensList(userList.data.filter((user) => (user.roles[0] === 'ROLE_CHILD' && user.parent.id === parseInt(id))));
        });
    }, [])

    return (
        <>
            <div className={styles.addContractContainer}>
                <Heading as='h3' size='lg'>Créer un contract</Heading>
                <div className={styles.addContractBoxContent}>


                    <FormControl isInvalid={isErrorContent} isRequired>
                        <FormLabel htmlFor='name'>Contenu</FormLabel>
                        <Textarea
                            id='name'
                            type='text'
                            value={contractContent}
                            placeholder='Le contenu du contrat'
                            onChange={handleContentChange}
                        />
                        {!isErrorContent ? (
                            <FormHelperText>
                                Le contenu du contrat
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>


                    <FormControl isInvalid={isErrorChild} isRequired>
                        <FormLabel htmlFor='name'>Enfant</FormLabel>
                        <Select id='who' placeholder="Selectionner un.e enfant" onChange={handleChildChange}>
                            {
                                childrensList.map((children) => (
                                    <option value={children.id}>{children.firstname}</option>
                                ))
                            }
                        </Select>
                        {!isErrorChild ? (
                            <FormHelperText>
                                L'enfant pour lequel vous créez le contrat
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>


                    <FormControl isInvalid={isErrorPoints} isRequired>
                        <FormLabel htmlFor='name'>Points par semaine</FormLabel>
                        <Input
                            id='name'
                            type='number'
                            value={contractPoints}
                            placeholder='100'
                            onChange={handlePointsChange}
                        />
                        {!isErrorPoints ? (
                            <FormHelperText>
                                Le nombre de points par semaine à répartir dans les missions
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>


                    <FormControl isInvalid={isErrorDollarPerPoint} isRequired>
                        <FormLabel htmlFor='name'>Valeur des points</FormLabel>
                        <Input
                            id='name'
                            type='number'
                            value={contractDollarPerPoint}
                            placeholder='100'
                            onChange={handleDollarPerPointChange}
                        />
                        {!isErrorDollarPerPoint ? (
                            <FormHelperText>
                                La valeur en € de chaque point
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button onClick={createContract} className={styles.confirmButton}>Créer le contrat</Button>
                </div>
            </div>
        </>
    );

    async function createContract() {

        if (!isErrorContent && !isErrorChild && !isErrorPoints && !isErrorDollarPerPoint) {

            const response = await postOnServer('contracts', {
                content: contractContent.toString(),
                parent: id,
                child: contractChild,
                childSignature: false,
                parentSignature: false,
                weeklyPoint: parseInt(contractPoints),
                dollarPerPoint: parseInt(contractDollarPerPoint),
                status: 1
            });

            if (response?.status === 200 || response?.status === 201) {
                toast({
                    title: `Contrat créé`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                router.push('/enfants');
            } else {
                toast({
                    title: `Echec de la création`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        } else {
            toast({
                title: `Echec de la création`,
                description: 'Les valeurs ne sont pas toutes remplies',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }
};

AddContractPage.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default AddContractPage;