import React, {useContext, useState, useEffect} from "react";
import {userContext} from "../_app";
import {useRouter} from "next/router";
import {postOnServer} from "../../src/utils/server";
import {
    Alert, AlertDescription, AlertIcon, AlertTitle,
    Button,
    Checkbox,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link, Select
} from "@chakra-ui/react";
import {AtSignIcon, UnlockIcon, QuestionOutlineIcon} from '@chakra-ui/icons'
import styles from "./index.module.scss";
import { getFromServerWithoutHeader } from "../../src/utils/server";

export default function Login() {
    const router = useRouter();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [parent, setParent] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ROLE_PARENT');

    const [parentList, setParentList] = useState([]);
    const isChildren = role !== 'ROLE_PARENT';

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    useEffect(() => {
        getFromServerWithoutHeader('parent_list').then((userList) => {
            setParentList(userList.data);
        });
    }, [])

    const {setToken} = useContext(userContext);

    return (
        <div className={styles.signUpContainer}>
            <div className={styles.signUpContent}>
                <Heading>KINDRED</Heading>
                <Heading as='h4' size='md'>Créer un compte</Heading>

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: "47%"}}>
                        <label>Nom</label>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<QuestionOutlineIcon color='gray.300'/>}
                            />
                            <Input
                                type="text"
                                backgroundColor="white"
                                placeholder='Jean'
                                value={nom} onChange={(event) => {setNom(event.target.value)}}
                            />
                        </InputGroup>
                    </div>
                    <div style={{width: "47%"}}>
                        <label>Prenom</label>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<QuestionOutlineIcon color='gray.300'/>}
                            />
                            <Input
                                type="text"
                                backgroundColor="white"
                                placeholder='Dupont'
                                value={prenom} onChange={(event) => {setPrenom(event.target.value)}}
                            />
                        </InputGroup>
                    </div>
                </div>

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{width: "47%"}}>
                        <label>Email</label>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<AtSignIcon color='gray.300'/>}
                            />
                            <Input
                                type="text"
                                backgroundColor="white"
                                placeholder='exemple@mail.com'
                                value={email} onChange={(event) => {setEmail(event.target.value)}}
                            />
                        </InputGroup>
                    </div>

                    <div style={{width: "47%"}}>
                        <label>Role</label>
                        <Select backgroundColor="white" onChange={(event) => {

                            if (event.target.value === 'Parent') {
                                setRole('ROLE_PARENT');
                            } else {
                                setRole('ROLE_CHILD');
                            }}}>
                            <option value='Parent'>Parent</option>
                            <option value='Enfant'>Enfant</option>
                        </Select>
                    </div>
                </div>

                {isChildren ? (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{width: "47%"}}>
                            <label>Parent</label>
                            <Select backgroundColor="white" onChange={(event) => {null}}>
                            {
                                parentList.map((parent) => (
                                <option value={parent.id}>{parent.firstname}</option>
                                ))
                            }
                            </Select>
                        </div>
                    </div>
                ) : null

                }

                <div>
                    <label>Mot de passe</label>
                    <InputGroup size='md'>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<UnlockIcon color='gray.300'/>}
                        />
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            backgroundColor="white"
                            placeholder='password'
                            value={password}
                            onChange={(event) => {setPassword(event.target.value)}}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </div>
                <Alert status='warning'>
                    <AlertIcon />
                    Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.
                </Alert>
                <div className={styles.actionSignUp}>
                    <Checkbox defaultChecked>Accepter les conditions d’utilisation générales et la politique de confidentialité.</Checkbox>
                </div>
                <Button onClick={signUp} color='white' backgroundColor="#38B2AC">Envoyer</Button>
            </div>

        </div>
    )

    async function signUp() {
        const response = await postOnServer('users', {
            email,
            roles: role,
            password,
            firstname: prenom,
            lastname: nom,
            parent: role === "ROLE_PARENT" ? null : parent,
        });
        if (response.status === 200) {
            router.push('/login');
        }

    }
}