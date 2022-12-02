import { Avatar, Box, Button, HStack, IconButton, LightMode, Menu, MenuButton, MenuItem, MenuList, Stack, Text, ToastId, useColorMode, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logOut } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser()
    const { isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200"); //(light | dark)
    const Icon = useColorModeValue(FaMoon, FaSun)
    const toast = useToast()
    const queryClient = useQueryClient()
    const toastId = useRef<ToastId>();
    const mutation = useMutation(logOut, {
        onMutate: () => {
                toastId.current = toast({
                title: "loging out...",
                description: "See you again!",
                status: "loading"
            })
        },
        onSuccess: () => {
            if (toastId.current) {
                queryClient.refetchQueries(['me'])
                toast.update(toastId.current, {
                status: "success",
                title: "done",
                description: "bye!",
                duration: 1000,
            })
            }
        },
    })
    const onLogOut = async () => {
        mutation.mutate();
    }
    return (
        <Stack direction={{
            base: "column",
            sm: "column",
            md:"row",
        }} spacing={{
            base: 4, sm: 4, md: 0,
        }} py={"5"} px={"40"} borderBottomWidth={1} alignItems="center" justifyContent={"space-between"}>
            <Box color={logoColor}>
                <Link to="/">
                    <HStack>
                        <FaAirbnb size={"38px"} />
                        <Text fontSize={"xl"} as="b">airbnb</Text>
                    </HStack>
                </Link>
            </Box>
            <HStack spacing={2}>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon />} />
                {!userLoading ? (
                    !isLoggedIn ? (
                    <>
                    <Button onClick={onLoginOpen}>LogIn</Button>
                    <LightMode><Button onClick={onSignUpOpen} colorScheme={"red"}>SignUp</Button></LightMode>
                        </>) : (
                            <HStack>
                            <Menu>
                                <MenuButton>
                                    <Avatar name={user?.username} src={user?.avatar} size={"sm"} />
                                </MenuButton>
                                <MenuList>
                                        <MenuItem onClick={onLogOut}>Log out</MenuItem>
                                        {user?.is_host ?
                                            <Link to="/rooms/upload">
                                                <MenuItem>Upload Room</MenuItem>
                                            </Link> : null }
                                </MenuList>
                                </Menu>
                                <Text fontSize={"sm"}>{user?.username}</Text>
                            </HStack>
                            )
                    ) : null} 
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}  />
        </Stack>
    )
}