import React, {useEffect, useState, useContext} from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
import styles from './index.module.scss';
import {Button, Heading, Text, useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getFromServer, patchOnServer, postOnServer} from "../../src/utils/server";
import {StarIcon} from '@chakra-ui/icons';
import {userContext} from "../_app";

const Rewards = ({ Component, pageProps }) => {

    const { user: { firstname, id, role } } = useContext(userContext);
    const toast = useToast();

    const [rewardsList, setRewardsList] = useState([]);
    const [rewardsRequestList, setRewardsRequestList] = useState([]);

  const router = useRouter();
  const handleAddReward = () => {
    router.push(`/rewards/addReward/`);
  };

  useEffect(() => {
    console.log(rewardsList);
  }, [rewardsList]);

  useEffect(() => {
    getFromServer("rewards").then((rewardsList) => {
      setRewardsList(rewardsList.data);
    });

        if (role !== 'ROLE_CHILD') {
            getFromServer('user_rewards').then((rewardsRequestList) => {
                setRewardsRequestList(rewardsRequestList.data.filter((reward) => (reward.validate === null)));
            });
        } else {
            // Filter à faire sur une future valeur
            getFromServer('user_rewards').then((rewardsRequestList) => {
                setRewardsRequestList(rewardsRequestList.data.filter((userReward)=> (userReward.user.id === parseInt(id))));
            });
        }
    }, []);

    return role === 'ROLE_PARENT' ? (
        <>
            <div className={styles.rewardContainer}>
                <Heading as='h3' size='lg'>Récompenses</Heading>
                <Heading as='h4' size='md'>Récompenses disponibles</Heading>
                <div className={styles.rewardsListContainer}>
                    {
                        rewardsList.map((reward) => (
                            <div className={styles.rewardBoxContent} key={reward.id}>
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
                        <Text fontSize='md'>Récompenses demandées : </Text>
                        {
                            rewardsRequestList.map((askedReward) => (
                                <div className={styles.rewardRequest}>
                                    <span className={styles.firstName}>{askedReward.user.firstname} :</span>
                                    <span> {askedReward.reward.name}</span>
                                    <Button onClick={() => validateReward(askedReward.id, true)} className={styles.confirmRewardRequest} size='xs'>Accepter</Button>
                                    <Button onClick={() => validateReward(askedReward.id, false)} className={styles.refuseRewardRequest} size='xs'>Refuser</Button>
                                </div>
                            ))
                        }


                    </div>

                </div>
                <div className={styles.addRewardContainer} onClick={handleAddReward}>
                    Ajouter une nouvelle récompense
                </div>
            </div>
        </>
    ) : (
        <>
            Enfant
            <div className={styles.rewardContainer}>
                <Heading as='h3' size='lg'>Récompenses</Heading>
                <Heading as='h4' size='md'>Récompenses disponibles</Heading>
                <div className={styles.rewardsListContainer}>
                    {
                        rewardsList.map((reward) => (
                            <div className={styles.rewardBoxContent} key={reward.id}>
                                <StarIcon w={6} h={6} color="#38B2AC" />
                                <Heading as='h5' size='sm'>{reward.name}</Heading>
                                <Text fontSize='md'>{reward.points} points</Text>

                                <Button onClick={() => askReward(reward.id)} color='white' backgroundColor="#38B2AC" border="2px solid #38B2AC">Choisir</Button>
                            </div>
                        ))
                    }
                </div>
                <Heading as='h4' size='md'>Récompenses en attente de validation du parent</Heading>
                <div className={styles.rewardsRequestListContainer}>
                    <div className={styles.rewardRequestContent}>
                        <Text fontSize='md'>Récompenses demandées : </Text>
                        {
                            rewardsRequestList.map((askedReward) => (
                                <div>{askedReward.reward.name} (Etat : {askedReward.validate === null ? 'En attente de validation' : (askedReward.validate ? 'Validée' : 'Refusée')})</div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );

    async function askReward(rewardId) {
        const response = await postOnServer('user_rewards', {
            user: id,
            reward: rewardId,
            validate: null
        });

        if (response?.status === 200 || response?.status === 201) {
            toast({
                title: `Récompense demandée`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            router.push('/dashboard');
        } else {
            toast({
                title: `Echec de la demande`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    async function validateReward(idUserReward, choice) {
        const response = await patchOnServer('user_rewards/' + idUserReward, {
            validate: choice
        });

        if (response?.status === 200 || response?.status === 201) {
            toast({
                title: `Choix pris en compte`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            router.push('/dashboard');
        } else {
            toast({
                title: `Echec de la demande`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

};

Rewards.getLayout = function getLayout(EmptyPage) {
  return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default Rewards;
