import React, {useState} from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    useToast
} from "@chakra-ui/react";
import styles from "./index.module.scss";
import {postOnServer} from "../../../src/utils/server";
import {useRouter} from "next/router";

const AddReward = ({ Component, pageProps }) => {

    const router = useRouter();
    const toast = useToast();

    const [rewardName, setRewardName] = useState('');
    const handleNameChange = (e) => setRewardName(e.target.value);
    const isErrorName = rewardName === '';

    const [rewardPoints, setRewardPoints] = useState('');
    const handlePointsChange = (e) => setRewardPoints(e.target.value);
    const isErrorPoint = rewardPoints === '';


    return (
        <>
            <div className={styles.addRewardContainer}>
                <Heading as='h3' size='lg'>Créer une récompense</Heading>
                <div className={styles.addRewardBoxContent}>
                    <FormControl isInvalid={isErrorName} isRequired>
                        <FormLabel htmlFor='name'>Intitulé</FormLabel>
                        <Input
                            id='name'
                            type='text'
                            value={rewardName}
                            placeholder='Nourrir le chat'
                            onChange={handleNameChange}
                        />
                        {!isErrorName ? (
                            <FormHelperText>
                                Le nom de la récompense
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isErrorPoint} isRequired>
                        <FormLabel htmlFor='name'>Points</FormLabel>
                        <Input
                            id='name'
                            type='number'
                            value={rewardPoints}
                            placeholder='100'
                            onChange={handlePointsChange}
                        />
                        {!isErrorPoint ? (
                            <FormHelperText>
                                Les points que coûtent la récompense
                            </FormHelperText>
                        ) : (
                            <FormErrorMessage>Requis</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button onClick={createReward} color='white' backgroundColor="#38B2AC">Envoyer</Button>
                </div>
            </div>
        </>
    );

    async function createReward() {

        if (!isErrorName && !isErrorPoint) {

            const response = await postOnServer('rewards', {
                name: rewardName.toString(),
                points: parseInt(rewardPoints),
            });

            if (response?.status === 200 || response?.status === 201) {
                toast({
                    title: `Récompense créée`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                router.push('/rewards');
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

AddReward.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default AddReward;