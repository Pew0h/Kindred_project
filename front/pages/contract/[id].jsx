import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getFromServer } from "../../src/utils/server";
import { Heading, Text } from "@chakra-ui/react";
import styles from "./index.module.scss";
import { userContext } from "../_app";

function Contract() {
  const {
    user: { role },
  } = useContext(userContext);

  const [contract, setContract] = useState({});
  const {
    query: { id: contractId },
  } = useRouter();

  useEffect(() => {
    console.log(contract);
  }, [contract]);

  useEffect(() => {
    getFromServer("contracts").then((contractsList) => {
      console.log(contractsList);
      setContract(
        contractsList.data.find(
          (contract) => contract.id === parseInt(contractId.toString())
        )
      );
    });
  }, [contractId]);

  return role === "ROLE_PARENT" ? (
    <div className={styles.contractContainer}>
      {contract && (
        <>
          <Heading as="h3" size="lg">
            Contrat de {contract.child?.firstname}
          </Heading>
          <Text fontSize="md" className={styles.contractText}>
            {contract.content}
          </Text>
          <Text fontSize="md" className={styles.contractPointText}>
            {" "}
            1 point = {contract.dollarPerPoint} €
          </Text>
          <div className={styles.signContainer}>
            <Text
              fontSize="md"
              className={styles.sign}
              backgroundColor={
                contract.parentSignature
                  ? "#38B2AC !important"
                  : "#E53E3E !important"
              }
            >
              Signature parent
            </Text>
            <Text
              fontSize="md"
              className={styles.sign}
              backgroundColor={
                contract.childSignature
                  ? "#38B2AC !important"
                  : "#E53E3E !important"
              }
            >
              Signature enfant
            </Text>
          </div>
        </>
      )}
    </div>
  ) : (
    <div>
      <p>Rôle enfant à gérer</p>
    </div>
  );
}

Contract.getLayout = function (Contract) {
  return <DashboardLayout>{Contract}</DashboardLayout>;
};

export default Contract;
