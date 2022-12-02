import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserNinja, FaLock } from "react-icons/fa";
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usenameLogIn } from "../api";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<IUsernameLoginSuccess, IUsernameLoginError, IUsernameLoginVariables>(usenameLogIn, {
        onSuccess: (data) => {
            // console.log(data)
            toast({
                title: data.ok,
                status: "success"
            });
            onClose();
            queryClient.prefetchInfiniteQuery(['me']);
            reset();
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = ({username, password}:IForm) => {
        mutation.mutate({username, password})
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color={"gray.400"}><FaUserNinja/></Box>} />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                {...register("username", { required: "username is required" })} variant={"filled"} placeholder="Username..." required />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<Box color={"gray.400"}><FaLock/></Box>} />
                            <Input {...register("password", { required: "password is required" })} type="password" variant={"filled"} placeholder="Password..." required />
                            <Text fontSize="xs" color="red">{errors.password?.message}</Text>
                        </InputGroup>
                    </VStack>
                    {mutation.isError ? <Text fontSize={"xs"} textAlign="center" color="red.500">Username or Password are wrong</Text>: null}
                    <Button isLoading={mutation.isLoading} type="submit" mt={4} w="100%" colorScheme={"red"}>Log In</Button>
                    <SocialLogin/>
                </ModalBody>
            </ModalContent>
        </Modal>    
    )
}