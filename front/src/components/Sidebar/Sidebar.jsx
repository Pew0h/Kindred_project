import {
    Avatar,
    Box,
    CloseButton, Drawer,
    DrawerContent, Flex,
    HStack, Icon, IconButton, Link, Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Text, useColorModeValue, useDisclosure, VStack
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, {useContext, useEffect, useState} from "react";
import {
    FiBook, FiChevronDown, FiHome, FiMenu, FiUser
} from "react-icons/fi";
import { TbChecklist } from "react-icons/tb"
import theme from "../../theme/theme";
import {userContext} from "../../../pages/_app";

const LinkItems = [
    { name: "Accueil", icon: FiHome, href: "/dashboard/" },
    { name: "Contrats", icon: TbChecklist, href: "/contracts/" },
];

export default function SidebarWithHeader({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
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
            <Box ml={{ base: 0, md: 60 }} p="4" backgroundColor="#FFFAF0">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, ...rest }) => {
    let role = null;
    if (typeof window !== "undefined") {
        role = sessionStorage.getItem("role");
    }
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
            {LinkItems.map((link) =>
                <NavItem key={link.name} icon={link.icon} href={link.href}>
                    {link.name}
                </NavItem>
            )}
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

    const {user: {firstname, lastname, role}} = useContext(userContext);
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

            <Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
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
                                        {role === 'ROLE_PARENT' ? 'Parent' : 'Enfant'}
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