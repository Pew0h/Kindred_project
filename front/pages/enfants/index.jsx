import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";

import {
  Avatar,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

import { getFromServer, postOnServer } from "../../src/utils/server";
import NextLink from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { userContext } from "../_app";

const Enfants = ({ Component, pageProps }) => {
  const {
    user: { id },
  } = useContext(userContext);

  const [contractsList, setContractsList] = useState([]);
  const [childrensList, setChildrensList] = useState([]);
  const [missionsInProgress, setMissionsInProgress] = useState([]);
  const [missionsCompleted, setMissionsCompleted] = useState([]);
  const [missions, setMissions] = useState([]);

  const router = useRouter();
  const handleAddChild = () => {
    router.push(`/enfants/addChild`);
  };

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
    getFromServer("contracts").then((contractsList) => {
      setContractsList(contractsList.data);
    });

    getFromServer("users").then((userList) => {
      setChildrensList(
        userList.data.filter(
          (user) =>
            user.roles[0] === "ROLE_CHILD" && user.parent.id === parseInt(id)
        )
      );
    });

    getFromServer("missions").then((missionsList) => {
      setMissions(missionsList.data);
    });
  }, []);

  useEffect(() => {
    console.log(childrensList);
  }, [childrensList]);

  return (
    <div className={styles.contractContainer}>
      <Heading as="h3" size="lg">
        Liste des enfants
      </Heading>
      <TableContainer>
        <Table variant="simple" className={styles.contractTable}>
          <Tbody>
            {childrensList.map((children) => (
              <Tr key={children.id} className={styles.childContainer}>
                <Td className={styles.firstTd}>
                  <Avatar size="sm" bg="teal.500" />
                </Td>
                <Td>{children.firstname}</Td>
                <Td>
                  {missionsCompleted
                    .filter((mission) => mission.child.id === children.id)
                    ?.reduce((acc, value) => acc + value.points, 0) ?? "0"}{" "}
                  POINT
                </Td>
                <Td>
                  <NextLink
                    href={"../contract/evaluate/" + children.id}
                    passHref
                  >
                    <Link color="#319795">Évaluer</Link>
                  </NextLink>
                </Td>
                <Td className={styles.lastTd}>
                  <NextLink
                    href={"../enfants/contractsList/" + children.id}
                    passHref
                  >
                    <Link color="#319795">Contrats</Link>
                  </NextLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className={styles.addChildContainer} onClick={handleAddChild}>
        Ajouter enfant
      </div>
    </div>
  );
};

Enfants.getLayout = function getLayout(Index) {
  return <DashboardLayout>{Index}</DashboardLayout>;
};

export default Enfants;
