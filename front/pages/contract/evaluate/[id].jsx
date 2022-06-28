import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import React, { useEffect, useState, useContext} from "react";

import { useRouter } from "next/router";
import {getFromServer, patchOnServer, postOnServer} from "../../../src/utils/server";
import styles from "./index.module.scss";
import {Badge, Heading, Select, Text, useToast} from "@chakra-ui/react";
import {userContext} from "../../_app";

function Evaluate() {
    const [missions, setMissions] = useState([]);
    const [missionsCompleted, setMissionsCompleted] = useState([]);
    const [missionsInProgress, setMissionsInProgress] = useState([]);
    const [notePossible, setNotePossible] = useState([]);
    const [userData, setUserData] = useState({});
    const {
        query: { id: childId },
    } = useRouter();

    const {
        user: { firstname, id, role },
    } = useContext(userContext);

    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        setMissionsInProgress(missions.filter((mission) =>
            (mission.parentNote === null || mission.childNote === null)
        ));
        setMissionsCompleted(missions.filter((mission) =>
            (mission.parentNote !== null && mission.childNote !== null)
        ));
    }, [missions])

    useEffect(() => {
        getFromServer('missions').then((missionsList) => {
            setMissions(missionsList.data.filter((mission) => mission.child.id === parseInt(childId)));
        });
        getFromServer('users/' + childId).then((userMissions) => {
            setUserData(userMissions.data);
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
                    { role === 'ROLE_PARENT' ? (
                        missionsCompleted.map((mission) => (
                            <div className={styles.missionContent}>
                                <div className={styles.missionNameBadge}>
                                    <label>{mission.name}</label>
                                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                                </div>
                                <div className={styles.selectNote}>
                                    <Select backgroundColor="white" selected={mission.parentNote.id} onChange={(event) => handleMissionParentNote(mission.id, event.target.value)}>
                                        {
                                            notePossible.map((note) => (
                                                <option value={note.id} selected={mission.parentNote.id === note.id}>{note.name}</option>
                                            ))
                                        }
                                    </Select>
                                </div>

                            </div>
                        ))
                        ) : (
                        missionsCompleted.map((mission) => (
                            <div className={styles.missionContent}>
                                <div className={styles.missionNameBadge}>
                                    <label>{mission.name}</label>
                                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                                </div>
                                <div className={styles.selectNote}>
                                    <Select backgroundColor="white" selected={mission.childNote.id} onChange={(event) => handleMissionChildNote(mission.id, event.target.value)}>
                                        {
                                            notePossible.map((note) => (
                                                <option value={note.id} selected={mission.child.id === note.id}>{note.name}</option>
                                            ))
                                        }
                                    </Select>
                                </div>

                            </div>
                        ))
                    )

                    }
                </div>
                <div className={styles.missionContainer}>
                    <Heading as='h5' size='sm'>
                        MISSIONS NON TERMINEES
                    </Heading>
                    { role === 'ROLE_PARENT' ? (
                        missionsInProgress.map((mission) => (
                            <div className={styles.missionContent}>
                                <div className={styles.missionNameBadge}>
                                    <label>{mission.name}</label>
                                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                                </div>
                                <div className={styles.selectNote}>
                                    <Select backgroundColor="white" selected={mission.parentNote?.id} onChange={(event) => {
                                        handleMissionParentNote(mission.id, event.target.value);
                                    }}>
                                        <option value={null}>-</option>
                                        {
                                            notePossible.map((note) => (
                                                <option value={note.id} selected={mission.parentNote?.id === note.id}>{note.name}</option>
                                            ))
                                        }
                                    </Select>
                                </div>

                            </div>
                        ))
                        ) : (
                        missionsInProgress.map((mission) => (
                            <div className={styles.missionContent}>
                                <div className={styles.missionNameBadge}>
                                    <label>{mission.name}</label>
                                    <Badge colorScheme='teal'>{mission.category.name}</Badge>
                                </div>
                                <div className={styles.selectNote}>
                                    <Select backgroundColor="white" selected={mission.childNote?.id} onChange={(event) => {
                                        handleMissionChildNote(mission.id, event.target.value);
                                    }}>
                                        <option value={null}>-</option>
                                        {
                                            notePossible.map((note) => (
                                                <option value={note.id} selected={mission.childNote?.id === note.id}>{note.name}</option>
                                            ))
                                        }
                                    </Select>
                                </div>

                            </div>
                        ))
                    )

                    }
                </div>
            </div>
        </>
    );

    async function handleMissionParentNote(idMission, idNote) {
        const response = await patchOnServer("missions/" + idMission, {
            parentNote: idNote === '-' ? null : idNote,
        });
        if (response?.status === 200 || response?.status === 201) {
            toast({
                title: `Note parent mise à jour`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            if (response?.status === 500 || response?.status === undefined) {
                toast({
                    title: `Note parent mise à jour`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: `Echec de la mise à jour`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }

    async function handleMissionChildNote(idMission, idNote) {
        const response = await patchOnServer("missions/" + idMission, {
            childNote: idNote === '-' ? null : idNote,
        });
        if (response?.status === 200 || response?.status === 201) {
            toast({
                title: `Note enfant mise à jour`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            if (response?.status === 500 || response?.status === undefined) {
                toast({
                    title: `Note enfant mise à jour`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: `Echec de la mise à jour`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }
}

Evaluate.getLayout = function (Contract) {
    return <DashboardLayout>{Contract}</DashboardLayout>;
};

export default Evaluate