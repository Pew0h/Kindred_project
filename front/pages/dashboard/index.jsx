import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import { Avatar, Badge, Heading, Select, Text } from "@chakra-ui/react";
import { userContext } from "../_app";
import { useRouter } from "next/router";
import { getFromServer } from "../../src/utils/server";

const Dashboard = ({ Component, pageProps }) => {
  const {
    user: { firstname, id, role },
  } = useContext(userContext);

  const router = useRouter();
  const handleAddChild = () => {
    router.push(`/missions/addMission`);
  };
  const [childrensList, setChildrensList] = useState([]);
  const [missionsInProgress, setMissionsInProgress] = useState([]);
  const [missionsCompleted, setMissionsCompleted] = useState([]);
  const [missions, setMissions] = useState([]);

  useEffect(() => {}, [childrensList]);

  useEffect(() => {
    setMissionsInProgress(
      missions.filter(
        (mission) => mission.parentNote === null || mission.childNote === null
      )
    );

    setMissionsCompleted(
      missions.filter(
        (mission) => mission.parentNote !== null && mission.childNote !== null
      )
    );
  }, [missions]);

  useEffect(() => {
    if (role !== "ROLE_CHILD") {
      getFromServer("users").then((userList) => {
        setChildrensList(
          userList.data.filter(
            (user) =>
              user.roles[0] === "ROLE_CHILD" && user.parent.id === parseInt(id)
          )
        );
      });
    }

    getFromServer("missions").then((missionsList) => {
      setMissions(missionsList.data);
    });
  }, []);
  return role === "ROLE_PARENT" ? (
    <>
      <div className={styles.dashboardContainer}>
        <Heading as="h3" size="lg">
          Bonjour {firstname}
        </Heading>
        <div className={styles.topContainer}>
          <Text fontSize="md">{childrensList.length} ENFANTS</Text>
          <Text fontSize="md">{missionsInProgress.length} MISSION</Text>
        </div>
        <div className={styles.childrenContainer}>
          <Heading as="h5" size="sm">
            ENFANTS
          </Heading>
          {childrensList.map((enfant) => (
            <div className={styles.childrenContent} key={enfant.firstname}>
              <Avatar size="sm" bg="teal.500" />
              <label>{enfant.firstname}</label>
              <label>
                {missionsCompleted
                  .filter((mission) => mission.child.id === enfant.id)
                  ?.reduce((acc, value) => acc + value.points, 0) ?? "0"}{" "}
                pts
              </label>
              <label>
                {
                  missionsInProgress.filter(
                    (mission) => mission.child.id === enfant.id
                  )?.length
                }{" "}
                missions en cours
              </label>
            </div>
          ))}
        </div>

        <div className={styles.missionContainer}>
          <Heading as="h5" size="sm">
            MISSIONS NON TERMINEES
          </Heading>
          {missionsInProgress.map((mission) => (
            <div className={styles.missionContent} key={mission.name}>
              <div className={styles.missionNameBadge}>
                <label>{mission.name}</label>
                <Badge colorScheme="teal">{mission.category.name}</Badge>
              </div>
              <div>{mission.points} pts</div>
            </div>
          ))}
        </div>

        <div className={styles.addMissionContainer} onClick={handleAddChild}>
          + Créer une mission
        </div>
      </div>
    </>
  ) : (
    <div>
      <p>Rôle enfant à gérer</p>
    </div>
  );
};

Dashboard.getLayout = function getLayout(EmptyPage) {
  return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default Dashboard;
