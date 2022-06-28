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

                    {contract?.status?.id == 41 ?
                      <Heading as='h3' size='md' className={styles.contractDisabledText}>{contract?.status?.name}</Heading>
                      :
                      contract?.status?.id == 21 ?
                      <Text fontSize='md' className={styles.contractDisabledText}>Vous devez signer ce contrat pour le valider et permettre à votre enfant de le signer.</Text>
                      :
                      contract?.status?.id == 1 ?
                      <Text fontSize='md' className={styles.contractDisabledText}>Ce contrat est en attente de la signature de votre enfant pour s'activer.</Text>
                      :
                      contract?.status?.id == 31 ?
                      <Text fontSize='md' className={styles.contractDisabledText}>Ce contrat est actif, vous pouvez le supprimer si vous souhaitez en créer un nouveau.</Text>
                      :
                      ''
                    }

                      <Text fontSize='md' className={styles.contractText}>{contract.content}</Text>
                    
                      <Text fontSize='md' className={styles.contractPointText}>
                        1 point = {contract.dollarPerPoint} €
                      </Text>
                      <div className={styles.signContainer}>
                        {contract?.status?.id == 21 ?
                          <Button h="3rem" size="md" className={styles.sign} onClick={signParent}>
                            Signer le contrat
                          </Button>
                          :
                          <Button h="3rem" size="md" className={styles.sign} backgroundColor="#38B2AC !important" color="white !important" disabled>
                            Vous avez signé
                          </Button>
                        }
                          <Button h="3rem" size="md" className={styles.sign} backgroundColor={contract?.status?.id == 31 ? "#38B2AC !important" : "#E53E3E !important"} color="white !important" disabled>
                            {contract?.status?.id == 31 ? "Signé par l'enfant" : "Non signé par l'enfant"}
                          </Button>
                      </div>

                      {contract?.status?.id !== 41 &&
                        <Button h="3rem" size="md" className={styles.deleteContract} onClick={disableContract}>
                          Désactiver le contrat
                        </Button>
                      }
                    
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

                  {contract?.status?.id == 41 ?
                    <Heading as='h3' size='md' className={styles.contractDisabledText}>{contract?.status?.name}</Heading>
                    :
                    contract?.status?.id == 21 ?
                    <Text fontSize='md' className={styles.contractDisabledText}>Ce contrat est en cours de rédaction par votre parent. Attendez qu'il l'ait validé pour le signer.</Text>
                    :
                    contract?.status?.id == 1 ?
                    <Text fontSize='md' className={styles.contractDisabledText}>Ce contrat est en attente de votre signature pour s'activer.</Text>
                    :
                    contract?.status?.id == 31 ?
                    <Text fontSize='md' className={styles.contractDisabledText}>Ce contrat est actif, seul votre parent peut le supprimer.</Text>
                    :
                    ''
                  }

                    <Text fontSize='md' className={styles.contractText}>{contract.content}</Text>

                    <Text fontSize='md' className={styles.contractPointText}>
                      1 point = {contract.dollarPerPoint} €
                    </Text>
                    <div className={styles.signContainer}>
                        <Button h="3rem" size="md" className={styles.sign} backgroundColor={contract?.status?.id !== 21 ? "#38B2AC !important" : "#E53E3E !important"} color={contract?.status?.id !== 21 ? "white !important" : "#2D3748 !important"} disabled>
                          {contract?.status?.id !== 1 ? "Signé par votre parent" : "Non signé par votre parent"}
                        </Button>
                      {contract?.status?.id == 1 ?
                        <Button h="3rem" size="md" className={styles.sign} onClick={signChild}>
                          Signer le contrat
                        </Button>
                        :
                        <Button h="3rem" size="md" className={styles.sign} backgroundColor="#38B2AC !important" color="white !important" disabled>
                          Vous avez signé
                        </Button>
                      }
                    </div>
                </>
            )}
        </div>
    )

    async function signParent() {
      const response = await patchOnServer(`contracts/${contract.id}`, {
        id: contract.id,
        parentSignature: true,
        status: 1
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
        childSignature: true,
        status: 31
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

    async function disableContract() {
      const response = await patchOnServer(`contracts/${contract.id}`, {
        id: contract.id,
        status: 41
      })

      if (response?.status === 200 || response?.status === 201) {
        toast({
          title: `Contrat désactivé`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push('/dashboard');
      } else {
        toast({
          title: `Echec de la désactivation`,
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
