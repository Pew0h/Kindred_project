import {useContext, useState} from "react";
import {userContext} from "../_app";
import {useRouter} from "next/router";
import {postOnServer} from "../../src/utils/server";
import {
    Button,
    Checkbox,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link
} from "@chakra-ui/react";
import {AtSignIcon, UnlockIcon} from '@chakra-ui/icons'
import NextLink from "next/link";
import styles from "./index.module.scss";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('parent1@example.com');
    const [password, setPassword] = useState('password');

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const {setToken} = useContext(userContext);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContent}>
                <Heading>KINDRED</Heading>
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
                <InputGroup size='md'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<UnlockIcon color='gray.300'/>}
                    />
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        backgroundColor="white"
                        placeholder='Enter password'
                        value={password}
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <div className={styles.actionLogin}>
                    <Checkbox defaultChecked>Se souvenir de moi</Checkbox>
                    {/*To do*/}
                    <NextLink href='/forgotPassword' passHref>
                        <Link>Mot de passe oublié</Link>
                    </NextLink>
                </div>
                <Button onClick={login} color='white' backgroundColor="#38B2AC">Envoyer</Button>
                <NextLink href='/signUp' passHref>
                    <Link>Pas encore inscrit.e ? Créez votre compte rapidement et facilement !</Link>
                </NextLink>
            </div>

        </div>
    )

    async function login() {
        const response = await postOnServer('login_check', {
            email,
            password
        });
        if (response.status === 200) {
            const {token} = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            router.push('/enfants');
        }

    }
}