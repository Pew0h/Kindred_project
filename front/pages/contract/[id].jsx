import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getFromServer, patchOnServer } from "../../src/utils/server";
import { Heading, Text, Button, useToast } from "@chakra-ui/react";
import styles from "./index.module.scss";
import { userContext } from "../_app";

function Contract() {
  const router = useRouter();
  const toast = useToast();

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

    return role === 'ROLE_PARENT' ? (
        <div className={styles.contractContainer}>
            {contract && (
                <>
                    <Heading as='h3' size='lg'>Contrat de {contract.child?.firstname}</Heading>
                    <Text fontSize='md' className={styles.contractText}>{contract.content}</Text>
                    <Text fontSize='md' className={styles.contractPointText}> 1 point
                        = {contract.dollarPerPoint} €</Text>
                    <div className={styles.signContainer}>
                        {/* <Text fontSize='md' className={styles.sign}
                              backgroundColor={contract.parentSignature ? "#38B2AC !important" : "#E53E3E !important"}>
                            Signature parent
                        </Text>
                        <Text fontSize='md' className={styles.sign}
                              backgroundColor={contract.childSignature ? "#38B2AC !important" : "#E53E3E !important"}>
                            Signature enfant
                        </Text> */}
                          {!contract.parentSignature ?
                            <Button h="3rem" size="md" className={styles.sign} onClick={signParent}>
                              Signer le contrat
                            </Button>
                            :
                            <Text fontSize='md' className={styles.sign}
                              backgroundColor="#38B2AC !important">
                                Vous avez signé
                            </Text>
                        }

                            <Text fontSize='md' className={styles.sign}
                            backgroundColor={contract.childSignature ? "#38B2AC !important" : "#E53E3E !important"}>
                              {contract.childSignature ? "Signé par l'enfant" : "Non signé par l'enfant"}
                            </Text>
                    </div>
                </>
            )}
        </div>
    )
    :
    (
      <div className={styles.contractContainer}>
            {contract && (
                <>
                    <Heading as='h3' size='lg'>Contrat de {contract.child?.firstname}</Heading>
                    <Text fontSize='md' className={styles.contractText}>{contract.content}</Text>
                    <Text fontSize='md' className={styles.contractPointText}> 1 point
                        = {contract.dollarPerPoint} €</Text>
                    <div className={styles.signContainer}>
                          <Text fontSize='md' className={styles.sign}
                            backgroundColor={contract.parentSignature ? "#38B2AC !important" : "#E53E3E !important"}>
                              {contract.parentSignature ? "Signé par le parent" : "Non signé par le parent"}
                          </Text>

                          {!contract.childSignature ?
                            <Button h="3rem" size="md" className={styles.sign} onClick={signChild}>
                              Signer le contrat
                            </Button>
                            :
                            <Text fontSize='md' className={styles.sign}
                              backgroundColor="#E53E3E !important">
                                Vous avez signé
                            </Text>
                          }
                    </div>
                </>
            )}
        </div>
    )

    async function signParent() {
      const response = await patchOnServer(`contracts/${contract.id}`, {
        id: contract.id,
        parentSignature: true
      })

      if (response?.status === 200 || response?.status === 201) {
        toast({
          title: `Contrat signé`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push('/dashboard');
      } else {
        toast({
          title: `Echec de la signature`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }

    async function signChild() {
      const response = await patchOnServer(`contracts/${contract.id}`, {
        id: contract.id,
        childSignature: true
      })

      if (response?.status === 200 || response?.status === 201) {
        toast({
          title: `Contrat signé`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push('/dashboard');
      } else {
        toast({
          title: `Echec de la signature`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
}

Contract.getLayout = function (Contract) {
  return <DashboardLayout>{Contract}</DashboardLayout>;
};

export default Contract;
