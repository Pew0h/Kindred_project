import { useContext, useState } from "react";
import { userContext } from "../_app";
import { useRouter } from "next/router";
import { postOnServer } from "../../src/utils/server";
import {
  Button,
  Checkbox,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { AtSignIcon, UnlockIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import styles from "./index.module.scss";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("parent1@example.com");
  const [password, setPassword] = useState("password");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { setToken } = useContext(userContext);

  return (
    <>
      <div className={styles.background}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
          <defs>
            <linearGradient id="shape-gradient-1" x2="0.35" y2="1">
              <stop offset="0%" stop-color="#F6AD55" />
              <stop offset="100%" stop-color="#ed8936" />
            </linearGradient>
            <linearGradient id="shape-gradient-2" x2="0.35" y2="1">
              <stop offset="0%" stop-color="#ed8936" />
              <stop offset="100%" stop-color="#F6AD55" />
            </linearGradient>
          </defs>
          <path
            d="M32.6,-28.6C43.9,-11.8,55.8,1.8,55.2,15.9C54.6,30.1,41.6,44.7,29.6,43.7C17.5,42.7,6.5,26.1,-5.4,17.8C-17.3,9.6,-30.1,9.7,-37.6,1.5C-45.1,-6.6,-47.3,-23,-40.1,-38.8C-33,-54.6,-16.5,-69.8,-2.9,-67.4C10.6,-65.1,21.3,-45.3,32.6,-28.6Z"
            transform="translate(50 200) scale(2 2)"
          />
          <path
            d="M61.7,-53.3C78.3,-45.1,88.9,-22.5,88.4,-0.5C88,21.6,76.5,43.3,59.9,48.3C43.3,53.4,21.6,41.9,4.7,37.2C-12.3,32.6,-24.7,34.8,-37.1,29.7C-49.5,24.7,-62,12.3,-62.3,-0.3C-62.6,-12.9,-50.6,-25.8,-38.2,-34C-25.8,-42.2,-12.9,-45.7,4.8,-50.5C22.5,-55.3,45.1,-61.5,61.7,-53.3Z"
            transform="translate(250 100) scale(2 2)"
          />
        </svg>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
          <Heading>KINDRED</Heading>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AtSignIcon color="gray.300" />}
            />
            <Input
              type="text"
              backgroundColor="white"
              placeholder="exemple@mail.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </InputGroup>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={<UnlockIcon color="gray.300" />}
            />
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              backgroundColor="white"
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <div className={styles.actionLogin}>
            <Checkbox defaultChecked>Se souvenir de moi</Checkbox>
            {/*To do*/}
            <NextLink href="/forgotPassword" passHref>
              <Link>Mot de passe oublié</Link>
            </NextLink>
          </div>
          <Button onClick={login} className={styles.buttonLogin}>
            Envoyer
          </Button>
          <NextLink href="/signUp" passHref>
            <Link>
              Pas encore inscrit.e ? Créez votre compte rapidement et facilement
              !
            </Link>
          </NextLink>
        </div>
      </div>
    </>
  );

  async function login() {
    const response = await postOnServer("login_check", {
      email,
      password,
    });
    if (response?.status === 200) {
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      router.push("/dashboard");
    }
  }
}
