import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function LoginModal({ isOpen, onClose }:LoginModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color={"gray.400"}><FaUserNinja/></Box>} />
                            <Input variant={"filled"} placeholder="Username..." />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color={"gray.400"}><FaLock/></Box>} />
                            <Input variant={"filled"} placeholder="Password..." />
                        </InputGroup>
                    </VStack>
                    <Button mt={4} w="100%" colorScheme={"red"}>Log In</Button>
                    <SocialLogin/>
                </ModalBody>
            </ModalContent>
        </Modal>    
    )
}