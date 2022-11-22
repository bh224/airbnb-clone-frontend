import { Box, Button, HStack, IconButton, LightMode, Stack, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const { isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen} = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200"); //(light | dark)
    const Icon = useColorModeValue(FaMoon, FaSun)
    return (
        <Stack direction={{
            base: "column",
            sm: "column",
            md:"row",
        }} spacing={{
            base: 4, sm: 4, md: 0,
        }} py={"5"} px={"40"} borderBottomWidth={1} alignItems="center" justifyContent={"space-between"}>
            <Box color={logoColor}>
                <Link to="/"><FaAirbnb size={"38px"} /></Link>
            </Box>
            <HStack spacing={2}>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon/>} />
                <Button onClick={onLoginOpen}>LogIn</Button>    
                <LightMode><Button onClick={onSignUpOpen} colorScheme={"red"}>SignUp</Button></LightMode>    
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose}  />
        </Stack>
    )
}