import React, {useState, useContext, useEffect} from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import {
    Button, Heading, Input, Select, useToast, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react";
import {getFromServer, postOnServer} from "../../../src/utils/server";
import {userContext} from "../../_app";
import {useRouter} from "next/router";


const AddMission = ({ Component, pageProps }) => {

    const router = useRouter();
    const toast = useToast();

    // On récupère l'utilisateur courant
    const {user: {id}} = useContext(userContext)

    // States pour l'envoi de la requêtes
    const [missionName, setMissionName] = useState('');
    const handleNameChange = (e) => setMissionName(e.target.value);
    const isErrorName = missionName === '';

    const [missionCategory, setMissionCategory] = useState('');
    const handleCategoryChange = (e) => setMissionCategory(e.target.value);
    const isErrorCategory = missionCategory === '';

    const [missionChild, setMissionChild] = useState('');
    const handleChildChange = (e) => setMissionChild(e.target.value);
    const isErrorChild = missionChild === '';

    const [missionDeadline, setMissionDeadline] = useState('');
    const handleDeadlineChange = (e) => setMissionDeadline(e.target.value);
    const isErrorDeadline = missionDeadline === '';

    const [missionPoints, setMissionPoints] = useState('');
    const handlePointsChange = (e) => setMissionPoints(e.target.value);
    const isErrorPoints = missionPoints === '';

    // States pour valeur en base
    const [categoriesList, setCategories] = useState([]);
    const [childrensList, setChildrensList] = useState([]);


    // Récupération data à la création du composant
    useEffect(() => {
        getFromServer('users').then((userList) => {
            setChildrensList(userList.data.filter((user) => (user.roles[0] === 'ROLE_CHILD' && user.parent.id === parseInt(id))));
        });

        getFromServer('categories').then((categoriesList) => {
            setCategories(categoriesList.data);
        });
    }, [])

    return (
        <>
            <div className={styles.createMissionContainer}>
                <Heading as='h3' size='lg'>Créer une mission</Heading>

                <div className={styles.createMissionBoxContent}>
                    <FormControl isInvalid={isErrorName} isRequired>
                        <FormLabel htmlFor='name'>Intitulé</FormLabel>
                        <Input
                            id='name'
                            type='text'
                            value={missionName}
                            placeholder='Nourrir le chat'
                            onChange={handleNameChange}
                        />
                        {!isErrorName ? (
                            <FormHelperText>
                                Le nom de la mission
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isErrorCategory} isRequired>
                        <FormLabel htmlFor='catégorie'>Catégorie</FormLabel>
                        <Select id='catégorie' placeholder="Selectionner une catégorie" onChange={handleCategoryChange}>
                            {
                                categoriesList.map((categorie) => (
                                    <option value={categorie.id}>{categorie.name}</option>
                                ))
                            }
                        </Select>
                        {!isErrorCategory ? (
                            <FormHelperText>
                                La catégorie de la mission
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isErrorChild} isRequired>
                        <FormLabel htmlFor='who'>Pour qui ?</FormLabel>
                        <Select id='who' placeholder="Selectionner un.e enfant" onChange={handleChildChange}>
                            {
                                childrensList.map((children) => (
                                    <option value={children.id}>{children.firstname}</option>
                                ))
                            }
                        </Select>
                        {!isErrorChild ? (
                            <FormHelperText>
                                L'enfant attribué.e à la mission
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isErrorDeadline} isRequired>
                        <FormLabel htmlFor='date'>Deadline</FormLabel>
                        <Input
                            type="date"
                            backgroundColor="white"
                            value={missionDeadline}
                            onChange={handleDeadlineChange}
                        />
                        {!isErrorDeadline ? (
                            <FormHelperText>
                                La date limite de la mission
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isErrorPoints} isRequired>
                        <FormLabel htmlFor='point'>Récompense en points</FormLabel>
                        <Input
                            type="number"
                            backgroundColor="white"
                            placeholder='3'
                            onChange={handlePointsChange}
                        />
                        {!isErrorPoints ? (
                            <FormHelperText>
                                Les points que rapporte la mission
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button onClick={createMission} color='white' backgroundColor="#38B2AC">Envoyer</Button>
                </div>
            </div>
        </>
    );

    async function createMission() {

        if (!isErrorName && !isErrorPoints && !isErrorChild && !isErrorCategory && !isErrorDeadline) {
            const actualDay = new Date();
            const response = await postOnServer('missions', {
                name: missionName.toString(),
                points: parseInt(missionPoints),
                startDate: (actualDay.getFullYear() + '-' + (actualDay.getMonth()+1) + '-' + actualDay.getDate()).toString(),
                endDate: missionDeadline.toString(),
                category: missionCategory,
                child: missionChild,
                parent: id,
                childNote: null,
                parentNote: null
            });

            if (response?.status === 200 || response?.status === 201) {
                toast({
                    title: `Mission créée`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                router.push('/dashboard');
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

AddMission.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default AddMission;