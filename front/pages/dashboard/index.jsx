import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import { Avatar, Badge, Heading, Select, Text } from "@chakra-ui/react";
import { userContext } from "../_app";
import { useRouter } from "next/router";
import { getFromServer } from "../../src/utils/server";
import moment from 'moment'


const Dashboard = ({ Component, pageProps }) => {

    const { user: { firstname, id } } = useContext(userContext);
    const UserContext = useContext(userContext);
    const isChild = UserContext.user.role == 'ROLE_CHILD';
    const router = useRouter();
    const handleAddChild = () => {
        router.push(`/missions/addMission`);
    };
    const [childrensList, setChildrensList] = useState([]);
    const [missionsInProgress, setMissionsInProgress] = useState([]);
    const [missionsCompleted, setMissionsCompleted] = useState([]);
    const [missions, setMissions] = useState([]);

    useEffect(() => {
    }, [childrensList])

    useEffect(() => {
        setMissionsInProgress(missions.filter((mission) =>
            (mission.parentNote === null || mission.childNote === null)));

        setMissionsCompleted(missions.filter((mission) =>
            (mission.parentNote !== null && mission.childNote !== null)
        ));
    }, [missions])
    const now = moment();
    // console.log(now)
    const childMissions = [
        {
            "id": 1,
            "name": "Jouer au PC",
            "points": 485,
            "startDate": "2022-06-03T00:00:00+00:00",
            "endDate": "2022-07-03T00:00:00+00:00",
            "category": {
                "id": 1,
                "name": "Courses"
            },
            "child": {
                "id": 211,
                "email": "child1@example.com",
                "roles": [
                    "ROLE_CHILD"
                ],
                "firstname": "Vandervort",
                "lastname": "Moen",
                "parent": {
                    "id": 161,
                    "email": "parent1@example.com",
                    "roles": [
                        "ROLE_PARENT"
                    ],
                    "firstname": "McClure",
                    "lastname": "Adams",
                    "parent": null
                }
            },
            "parent": {
                "id": 161,
                "email": "parent1@example.com",
                "roles": [
                    "ROLE_PARENT"
                ],
                "firstname": "McClure",
                "lastname": "Adams",
                "parent": null
            },
            "childNote": {
                "id": 1,
                "name": "Bien",
                "coefficient": 2
            },
            "parentNote": {
                "id": 1,
                "name": "Bien",
                "coefficient": 2
            }
        },
        {
            "id": 41,
            "name": "Nettoyer la cheminée",
            "points": 20,
            "startDate": "2022-06-22T00:00:00+00:00",
            "endDate": "2022-06-26T00:00:00+00:00",
            "category": {
                "id": 1,
                "name": "Courses"
            },
            "child": {
                "id": 211,
                "email": "child1@example.com",
                "roles": [
                    "ROLE_CHILD"
                ],
                "firstname": "Vandervort",
                "lastname": "Moen",
                "parent": {
                    "id": 161,
                    "email": "parent1@example.com",
                    "roles": [
                        "ROLE_PARENT"
                    ],
                    "firstname": "McClure",
                    "lastname": "Adams",
                    "parent": null
                }
            },
            "parent": {
                "id": 161,
                "email": "parent1@example.com",
                "roles": [
                    "ROLE_PARENT"
                ],
                "firstname": "McClure",
                "lastname": "Adams",
                "parent": null
            },
            "childNote": null,
            "parentNote": null
        },
        {
            "id": 42,
            "name": "Nettoyer le couloir",
            "points": 20,
            "startDate": "2022-06-22T00:00:00+00:00",
            "endDate": "2022-06-22T00:00:00+00:00",
            "category": {
                "id": 1,
                "name": "Courses"
            },
            "child": {
                "id": 211,
                "email": "child1@example.com",
                "roles": [
                    "ROLE_CHILD"
                ],
                "firstname": "Vandervort",
                "lastname": "Moen",
                "parent": {
                    "id": 161,
                    "email": "parent1@example.com",
                    "roles": [
                        "ROLE_PARENT"
                    ],
                    "firstname": "McClure",
                    "lastname": "Adams",
                    "parent": null
                }
            },
            "parent": {
                "id": 161,
                "email": "parent1@example.com",
                "roles": [
                    "ROLE_PARENT"
                ],
                "firstname": "McClure",
                "lastname": "Adams",
                "parent": null
            },
            "childNote": null,
            "parentNote": null
        },
        {
            "id": 42,
            "name": "Nettoyer le couloir du sous-sol",
            "points": 20,
            "startDate": "2022-06-13T00:00:00+00:00",
            "endDate": "2022-06-17T00:00:00+00:00",
            "category": {
                "id": 1,
                "name": "Courses"
            },
            "child": {
                "id": 211,
                "email": "child1@example.com",
                "roles": [
                    "ROLE_CHILD"
                ],
                "firstname": "Vandervort",
                "lastname": "Moen",
                "parent": {
                    "id": 161,
                    "email": "parent1@example.com",
                    "roles": [
                        "ROLE_PARENT"
                    ],
                    "firstname": "McClure",
                    "lastname": "Adams",
                    "parent": null
                }
            },
            "parent": {
                "id": 161,
                "email": "parent1@example.com",
                "roles": [
                    "ROLE_PARENT"
                ],
                "firstname": "McClure",
                "lastname": "Adams",
                "parent": null
            },
            "childNote": null,
            "parentNote": null
        },
        {
            "id": 43,
            "name": "Nettoyer la cuisine",
            "points": 20,
            "startDate": "2022-06-06T00:00:00+00:00",
            "endDate": "2022-06-12T00:00:00+00:00",
            "category": {
                "id": 1,
                "name": "Courses"
            },
            "child": {
                "id": 211,
                "email": "child1@example.com",
                "roles": [
                    "ROLE_CHILD"
                ],
                "firstname": "Vandervort",
                "lastname": "Moen",
                "parent": {
                    "id": 161,
                    "email": "parent1@example.com",
                    "roles": [
                        "ROLE_PARENT"
                    ],
                    "firstname": "McClure",
                    "lastname": "Adams",
                    "parent": null
                }
            },
            "parent": {
                "id": 161,
                "email": "parent1@example.com",
                "roles": [
                    "ROLE_PARENT"
                ],
                "firstname": "McClure",
                "lastname": "Adams",
                "parent": null
            },
            "childNote": null,
            "parentNote": null
        }
    ];
    const mondayOfLastWeek = moment().startOf('isoWeek').subtract(7, 'days');
    const sundayOfLastWeek = moment(mondayOfLastWeek).add(6, 'days');
    const nextSunday = moment().endOf('isoWeek');
    const childsMissionsInProgress = childMissions.filter((mission) => moment(mission.startDate).isAfter(sundayOfLastWeek) && moment(mission.endDate).isSameOrBefore(nextSunday));
    const childsMissionsLastWeek = childMissions.filter((mission) => moment(mission.startDate).isSameOrAfter(mondayOfLastWeek) && moment(mission.endDate).isSameOrBefore(sundayOfLastWeek));
    const childsOldMissions = childMissions.filter((mission) => moment(mission.endDate).isBefore(mondayOfLastWeek));
    useEffect(() => {
        if (UserContext.user.role == 'ROLE_CHILD') {
            getFromServer('missions').then((missionsList) => {
            });

        } else {
            getFromServer('users').then((userList) => {
                setChildrensList(userList.data.filter((user) => (user.roles[0] === 'ROLE_CHILD' && user.parent.id === parseInt(id))));
                getFromServer('missions').then((missionsList) => {
                    setMissions(missionsList.data);
                });
            }).catch(error => {
                console.log(error);
            })
        }

    }, [UserContext])

    const MissionsInProgress = () => {
        return missionsInProgress.map((mission) => (
            <div className={styles.missionContent} key={mission.name}>
                <div className={styles.missionNameBadge}>
                    <label>{mission.name}</label>
                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                </div>
                <div className={styles.missionPoint}>
                    {mission.points} pts
                </div>
            </div>
        ))
    }
    const ChildsMissionsInProgress = () => {
        return childsMissionsInProgress.map((mission) => (
            <div className={styles.missionContent} key={mission.name}>
                <div className={styles.missionNameBadge}>
                    <label>{mission.name}</label>
                    <div style={{ display: 'flex' }}>
                        <Badge colorScheme='teal' style={{ marginRight: '5px' }}>{mission.category.name}</Badge>
                        <Badge colorScheme={moment(mission.endDate).diff(moment(), 'days') < 0 ? 'red' : 'orange'}>{moment(mission.endDate).diff(moment(), 'days') < 0 ? `en retard de ${moment(mission.endDate).diff(moment(), 'days') * -1} jour(s)` : `il reste ${moment(mission.endDate).diff(moment(), 'days')} jours`}</Badge></div>
                </div>
                <div className={styles.missionPoint}>
                    {mission.points} pts
                </div>
            </div>
        ))
    }
    const ChildsMissionsInLastWeeks = () => {
        return childsMissionsLastWeek.map((mission) => (
            <div className={styles.missionContent} key={mission.name}>
                <div className={styles.missionNameBadge}>
                    <label>{mission.name}</label>
                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                </div>
                <div className={styles.missionPoint}>
                    {mission.points} pts
                </div>
            </div>
        ))

    }
    const ChildsOldMissions = () => {
        return childsOldMissions.map((mission) => (
            <div className={styles.missionContent} key={mission.name}>
                <div className={styles.missionNameBadge}>
                    <label>{mission.name}</label>
                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                </div>
                <div className={styles.missionPoint}>
                    {mission.points} pts
                </div>
            </div>
        ))
    }
    const ChildrensList = () => {

    }
    // const ChildsMissionsInProgress = () => {

    // }
    return (
        <>
            <div className={styles.dashboardContainer}>
                <Heading as='h3' size='lg'>Bonjour {firstname}</Heading>
                <div className={styles.topContainer}>
                    {!isChild && <Text fontSize='md'>{childrensList.length} ENFANTS</Text>}
                    {!isChild && <Text fontSize='md'>{missionsInProgress.length} MISSION</Text>}
                </div>
                {!isChild && <div className={styles.childrenContainer}>
                    <Heading as='h5' size='sm'>
                        ENFANTS
                    </Heading>
                    {
                        childrensList.map((enfant) => (
                            <div className={styles.childrenContent} key={enfant.firstname}>
                                <Avatar size='sm' bg='teal.500' />
                                <label>{enfant.firstname}</label>
                                <label>{missionsCompleted.filter((mission) => (mission.child.id === enfant.id))?.reduce((acc, value) => acc + value.points, 0) ?? '0'} pts</label>
                                <label>{missionsInProgress.filter((mission) => (mission.child.id === enfant.id))?.length} missions en cours</label>
                            </div>
                        ))
                    }
                </div>}


                <div className={styles.missionContainer}>
                    {!isChild && <Heading as='h5' size='sm'>MISSIONS NON TERMINEES</Heading>}
                    {isChild && <Heading as='h5' size='sm'>MISSIONS EN COURS</Heading>}
                    {isChild && <ChildsMissionsInProgress></ChildsMissionsInProgress>}
                </div>
                <div className={styles.missionContainer}>
                    {isChild && <Heading as='h5' size='sm'>MISSIONS DE LA SEMAINE DERNIÈRE</Heading>}
                    {isChild && <ChildsMissionsInLastWeeks></ChildsMissionsInLastWeeks>}
                </div>
                <div className={styles.missionContainer}>
                    {isChild && <Heading as='h5' size='sm'>MISSIONS ANCIENNES</Heading>}
                    {isChild && <ChildsOldMissions></ChildsOldMissions>}
                </div>

                {!isChild && <div className={styles.addMissionContainer} onClick={handleAddChild}>
                    Créer une mission
                </div>}


            </div>
        </>
    );
};

Dashboard.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default Dashboard;