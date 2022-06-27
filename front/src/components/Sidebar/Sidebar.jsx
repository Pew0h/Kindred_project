import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useContext } from "react";
import { FiChevronDown, FiHome, FiMenu } from "react-icons/fi";
import { TbChecklist } from "react-icons/tb";
import { BiMedal } from "react-icons/bi";
import theme from "../../theme/theme";
import { userContext } from "../../../pages/_app";
import styles from "./sidebar.module.scss";

const LinkItemsParent = [
  { name: "Accueil", icon: FiHome, href: "/dashboard/" },
  { name: "Enfants", icon: TbChecklist, href: "/enfants/" },
  { name: "Récompenses", icon: BiMedal, href: "/rewards/" },
];

const LinkItemsChild = [
  { name: "Accueil", icon: FiHome, href: "/dashboard/" },
  {
    name: "Historique des missions",
    icon: FiHome,
    href: "/missions/historical/",
  },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
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
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const {
    user: { role },
  } = useContext(userContext);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {role === "ROLE_PARENT"
        ? LinkItemsParent.map((link) => (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
              {link.name}
            </NavItem>
          ))
        : LinkItemsChild.map((link) => (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
              {link.name}
            </NavItem>
          ))}
    </Box>
  );
};

const NavItem = ({ icon, children, href, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: theme.colors.primary.normal,
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const {
    user: { firstname, lastname, role },
  } = useContext(userContext);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={"/profil.png"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{`${firstname} ${lastname}`}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {role === "ROLE_PARENT" ? "Parent" : "Enfant"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <NextLink href="/dashboard/profile" passHref>
                <Link>
                  <MenuItem>Profile</MenuItem>
                </Link>
              </NextLink>
              <MenuDivider />
              <Link href="/login">
                <MenuItem>Sign out</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
