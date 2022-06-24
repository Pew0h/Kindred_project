import React, {useContext, useEffect, useState} from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import {userContext} from "../../_app";
import {getFromServer} from "../../../src/utils/server";
import moment from "moment";
import styles from './index.module.scss';
import {Badge, Heading} from "@chakra-ui/react";


const MissionHistorical = ({ Component, pageProps }) => {

    const { user: { firstname, id, role } } = useContext(userContext);
    const UserContext = useContext(userContext);
    const now = moment();

    const [missions, setMissions] = useState([]);
    const [childsMissionsInProgress, setChildsMissionsInProgress] = useState([]);
    const [childsMissionsLastWeek, setChildsMissionsLastWeek] = useState([]);
    const [childsOldMissions, setChildsOldMissions] = useState([]);

    useEffect(() => {
        const mondayOfLastWeek = moment().startOf('isoWeek').subtract(7, 'days');
        const sundayOfLastWeek = moment(mondayOfLastWeek).add(6, 'days');
        const nextSunday = moment().endOf('isoWeek');
        setChildsMissionsInProgress(missions.filter((mission) => moment(mission.startDate).isAfter(sundayOfLastWeek) && moment(mission.endDate).isSameOrBefore(nextSunday)));
        setChildsMissionsLastWeek(missions.filter((mission) => moment(mission.startDate).isSameOrAfter(mondayOfLastWeek) && moment(mission.endDate).isSameOrBefore(sundayOfLastWeek)));
        setChildsOldMissions(missions.filter((mission) => moment(mission.endDate).isBefore(mondayOfLastWeek)));

        console.log(missions);
        console.log(childsMissionsInProgress);
        console.log(childsMissionsLastWeek);
        console.log(childsOldMissions);
    },[missions])

    useEffect(() => {

        getFromServer('missions').then((missionsList) => {
            setMissions(missionsList.data);
        });
    }, [])

    const ChildsMissionsInProgress = () => {
        return childsMissionsInProgress.map((mission) => (
            <div className={styles.missionContent} key={mission.name}>
                <div className={styles.missionNameBadge}>
                    <label>{mission.name}</label>
                    <div style={{ display: 'flex' }}>
                        <Badge colorScheme='teal' style={{ marginRight: '5px' }}>{mission.category.name}</Badge>
                        <Badge colorScheme={moment(mission.endDate).diff(moment(), 'days') < 0 ? 'red' : 'orange'}>{moment(mission.endDate).diff(moment(), 'days') < 0 ? `en retard de ${moment(mission.endDate).diff(moment(), 'days') * -1} jour(s)` : `il reste ${moment(mission.endDate).diff(moment(), 'days')} jours`}</Badge></div>
                </div>
                <div>
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
                <div>
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
                <div>
                    {mission.points} pts
                </div>
            </div>
        ))
    }

    return (
        <>
            <div className={styles.historicalContainer}>
                <Heading as='h3' size='lg'>Historique des missions</Heading>
                <div className={styles.missionContainer}>
                    <Heading as='h5' size='sm'>MISSIONS EN COURS</Heading>
                    <ChildsMissionsInProgress></ChildsMissionsInProgress>
                </div>
                <div className={styles.missionContainer} style={{display: role ==='ROLE_CHILD' ? 'flex' : 'none'}}>
                    <Heading as='h5' size='sm'>MISSIONS DE LA SEMAINE DERNIÈRE</Heading>
                    <ChildsMissionsInLastWeeks></ChildsMissionsInLastWeeks>
                </div>
                <div className={styles.missionContainer} style={{display: role ==='ROLE_CHILD' ? 'flex' : 'none'}}>
                    <Heading as='h5' size='sm'>MISSIONS ANCIENNES</Heading>
                    <ChildsOldMissions></ChildsOldMissions>
                </div>
            </div>

        </>
    );
};

MissionHistorical.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default MissionHistorical;