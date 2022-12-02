import { Box, Button, Container, FormControl, Heading, Input, useToast, VStack } from "@chakra-ui/react";
import { Mutation, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

interface IForm {
    file: FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}

export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>()
    const toast = useToast()
    const { roomPk } = useParams()
    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "uploaded",
                isClosable: true,
            })
            reset()
        }
    })
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({result}: any) => {
            if (roomPk) {
                createPhotoMutation.mutate({
                description: "uploading my rooms...",
                file: `https://imagedelivery.net/ln8dRy09Sg-Wo4LLCWOoiw/${result.id}/public`,
                roomPk,
            })
            }
        }
    })
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file")
            })
        }
    })
    useHostOnlyPage()
    const onSubmit = () => {
        uploadURLMutation.mutate()
    }
    // console.log(watch())
    return (
        <ProtectedPage>
            <Box pb={40} mt={10} px={{base:10, lg:40}}>
                <Container>
                    <Heading textAlign={"center"}>Upload Photos</Heading>
                    <VStack as="form" spacing={5} mt={10} onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <Input {...register("file")} type="file" accept="image/*" />
                        </FormControl>
                        <Button isLoading={ createPhotoMutation.isLoading || uploadImageMutation.isLoading || uploadURLMutation.isLoading } type="submit" w="full" colorScheme={"red"}>
                            Upload Photos
                        </Button>
                    </VStack>
                </Container>
            </Box>

        </ProtectedPage>
    )
}