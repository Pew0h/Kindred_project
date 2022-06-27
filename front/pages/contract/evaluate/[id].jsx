import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import {getFromServer} from "../../../src/utils/server";
import styles from "./index.module.scss";
import {Badge, Heading, Select, Text} from "@chakra-ui/react";

function Evaluate() {
    const [missions, setMissions] = useState([]);
    const [missionsCompleted, setMissionsCompleted] = useState([]);
    const [missionsInProgress, setMissionsInProgress] = useState([]);
    const [notePossible, setNotePossible] = useState([]);
    const [userData, setUserData] = useState({});
    const {
        query: { id: childId },
    } = useRouter();


    useEffect(() => {
        console.log("missions");
        console.log(missions);
        setMissionsInProgress(missions.filter((mission) =>
            (mission.parentNote === null || mission.childNote === null)
        ));
        setMissionsCompleted(missions.filter((mission) =>
            (mission.parentNote !== null && mission.childNote !== null)
        ));

        console.log("missionsCompleted");
        console.log(missionsCompleted);
        console.log("missionsInProgress");
        console.log(missionsInProgress);

    }, [missions])

    useEffect(() => {
        getFromServer('missions').then((missionsList) => {
            setMissions(missionsList.data.filter((mission) => mission.child.id === parseInt(childId)));
        });
        getFromServer('users/' + childId).then((userMissions) => {
            console.log("userMissions");
            console.log(userMissions);


            // setUserData(userMissions.data);
        });
        getFromServer('notes').then((noteList) => {
            setNotePossible(noteList.data);
        });
    }, [childId]);

    return (
        <>
            <div className={styles.evaluateContainer}>
                <Heading as='h3' size='lg'>Evaluer la semaine de {userData.firstname}</Heading>
                <div className={styles.missionContainer}>
                    <Heading as='h5' size='sm'>
                        MISSIONS TERMINEES
                    </Heading>
                    {
                        missionsCompleted.map((mission) => (
                            <div className={styles.missionContent}>
                                <div className={styles.missionNameBadge}>
                                    <label>{mission.name}</label>
                                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                                </div>
                                <div className={styles.selectNote}>
                                    <Select backgroundColor="white" selected={mission.parentNote.id}>
                                        {
                                            notePossible.map((note) => (
                                                <option value={note.id} selected={mission.parentNote.id === note.id}>{note.name}</option>
                                            ))
                                        }
                                    </Select>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <div className={styles.missionContainer}>
                    <Heading as='h5' size='sm'>
                        MISSIONS NON TERMINEES
                    </Heading>
                    {
                        missionsInProgress.map((mission) => (
                            <div className={styles.missionContent}>
                                <div className={styles.missionNameBadge}>
                                    <label>{mission.name}</label>
                                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                                </div>
                                <div className={styles.selectNote}>
                                    <Select backgroundColor="white" selected={mission.parentNote?.id}>
                                        {
                                            notePossible.map((note) => (
                                                <option value={note.id} selected={mission.parentNote?.id === note.id}>{note.name}</option>
                                            ))
                                        }
                                    </Select>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

Evaluate.getLayout = function (Contract) {
    return <DashboardLayout>{Contract}</DashboardLayout>;
};

export default Evaluate