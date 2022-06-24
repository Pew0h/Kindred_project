import React, {useEffect, useState} from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
import styles from './index.module.scss';
import {Button, Heading, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getFromServer} from "../../src/utils/server";
import {StarIcon} from '@chakra-ui/icons';

const Rewards = ({ Component, pageProps }) => {

    const [rewardsList, setRewardsList] = useState([]);
    const [rewardsRequestList, setRewardsRequestList] = useState([]);

    const router = useRouter();
    const handleAddReward = () => {
        router.push(`/rewards/addReward/`);
    };

    useEffect(() => {
        console.log(rewardsList);
    }, [rewardsList])


    useEffect(() => {
        getFromServer('rewards').then((rewardsList) => {
            setRewardsList(rewardsList.data);
        });

        // Filter à faire sur une future valeur
        getFromServer('user_rewards').then((rewardsRequestList) => {
            setRewardsRequestList(rewardsRequestList.data);
        });

    }, []);

    return (
        <>
            <div className={styles.rewardContainer}>
                <Heading as='h3' size='lg'>Récompenses</Heading>
                <Heading as='h4' size='md'>Récompenses disponibles</Heading>
                <div className={styles.rewardsListContainer}>
                    {
                        rewardsList.map((reward) => (
                            <div className={styles.rewardBoxContent}>
                                <StarIcon w={6} h={6} color="#38B2AC" />
                                <Heading as='h5' size='sm'>{reward.name}</Heading>
                                <Text fontSize='md'>{reward.points} points</Text>
                            </div>
                        ))
                    }
                </div>
                <Heading as='h4' size='md'>Récompenses à valider</Heading>
                <div className={styles.rewardsRequestListContainer}>
                    <div className={styles.rewardRequestContent}>
                        <Text fontSize='md'>Votre enfant à demander la récompense : </Text>
                        <Button color='white' backgroundColor="#48BB78">Accepter</Button>
                        <Button color='white' backgroundColor="#F56565">Refuser</Button>
                    </div>

                </div>
                <div className={styles.addRewardContainer} onClick={handleAddReward}>
                    Ajouter une nouvelle récompense
                </div>
            </div>
        </>
    );
};

Rewards.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default Rewards;