import React, {useState, useContext, useEffect} from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import {Button, Heading, Input, Select, useToast } from "@chakra-ui/react";
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
    const [missionCategory, setMissionCategory] = useState('');
    const [missionChild, setMissionChild] = useState('');
    const [missionDeadline, setMissionDeadline] = useState('');
    const [missionPoints, setMissionPoints] = useState('');

    // States pour valeur en base
    const [categoriesList, setCategories] = useState([]);
    const [childrensList, setChildrensList] = useState([]);


    useEffect(() => {
        console.log(categoriesList);

    }, [categoriesList])

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
                    <label>Intitulé</label>
                    <Input
                        type="text"
                        backgroundColor="white"
                        placeholder='Nourrir le chat'
                        onChange={(event) => {setMissionName(event.target.value)}}
                    />
                    <label>Catégorie</label>
                    <Select backgroundColor="white" onChange={(event) => { setMissionCategory(event.target.value) }}>
                        {
                            categoriesList.map((categorie) => (
                                <option value={categorie.id}>{categorie.name}</option>
                            ))
                        }
                    </Select>
                    <label>Pour qui ?</label>
                    <Select backgroundColor="white" onChange={(event) => { setMissionChild(event.target.value) }}>
                        {
                            childrensList.map((children) => (
                                <option value={children.id}>{children.firstname}</option>
                            ))
                        }
                    </Select>
                    <label>Deadline</label>
                    <Input
                        type="date"
                        backgroundColor="white"
                        placeholder='2002-06-23'
                        onChange={(event) => {setMissionDeadline(event.target.value)}}
                    />
                    <label>Récompense en points</label>
                    <Input
                        type="number"
                        backgroundColor="white"
                        placeholder='3'
                        onChange={(event) => {setMissionPoints(event.target.value)}}
                    />
                    <Button onClick={createMission} color='white' backgroundColor="#38B2AC">Envoyer</Button>
                </div>
            </div>
        </>
    );

    async function createMission() {

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

        console.log(response);

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

    }

};

AddMission.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default AddMission;