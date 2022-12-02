import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
    Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBed, FaMoneyBill, FaToilet, FaUsb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAmenities, getCategories, IUploadRoomVariables, uploadRoom } from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IAmenity, ICategory, IRoomDetail } from "../types";


export default function UploadRoom() {
    const { register, handleSubmit } = useForm<IUploadRoomVariables>()
    const toast = useToast()
    const navigate = useNavigate()
    const mutation = useMutation(uploadRoom, {
        onSuccess: (data: IRoomDetail) => { 
            console.log(data.id)
            toast({
                status: "success",
                title:"room created!",
            })
            navigate(`/rooms/${data.id}`)
        },
    })
    const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<IAmenity[]>(['amenities'], getAmenities)
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>(['categories', 'rooms'], getCategories)

    // console.log(categories, isCategoriesLoading)
    useHostOnlyPage(); //Protectedpage같은 컴포넌트가 아닌 훅으로 생성
    const onSubmit = (data:IUploadRoomVariables) => {
        mutation.mutate(data)
    }
    return (
        <ProtectedPage>
        <Box
            pb={40}
            mt={10}
            px={{
            base: 10,
            lg: 40,
            }}
        >
            <Container>
            <Heading textAlign={"center"}>Upload Room</Heading>
            <VStack spacing={5} as="form" mt={5} gap={10} onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>name</FormLabel>
                    <Input {...register("name", {required:true})} type="text" />
                    <FormHelperText>write the name of room</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Input {...register("country", {required:true})} required type="text" />
                </FormControl>
                <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input {...register("city", {required:true})} required type="text" />
                </FormControl>
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input {...register("address", {required:true})} required type="text" />
                </FormControl>
                <FormControl>
                    <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children="$USD"/>
                                <Input {...register("price", {required:true})} type="number" min={0}/>
                            </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Rooms</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input {...register("rooms", {required:true})} type="number" min={0}/>
                            </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Toilets</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input {...register("toilets", {required:true})} type="number" min={0}/>
                            </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                        <Textarea {...register("description")}/>
                        </FormControl>
                <FormControl>    
                <Checkbox {...register("pet_friendly")}>Pet Friendly?</Checkbox>
                </FormControl>
                        <FormControl> 
                            <FormLabel>Kind of room</FormLabel>   
                            <Select {...register("kind", {required:true})} placeholder="choose a kind">
                                <option value="entire_place">Entire Place</option>
                                <option value="private_place">Private Place</option>
                                <option value="shared_place">Shared Place</option>
                            </Select>
                            <FormHelperText>What kind of roo are you renting?</FormHelperText>
                </FormControl>
                        <FormControl> 
                            <FormLabel>Room Category</FormLabel>   
                            <Select {...register("category", {required:true})} placeholder="choose a kind">
                                {categories?.map((category) => 
                                    (
                                        <option key={category.pk} value={category.pk} >{category.name}</option>
                                ))}
                            </Select>
                            <FormHelperText>What category of your rooms</FormHelperText>
                </FormControl>
                        <FormControl> 
                            <FormLabel>Amenities</FormLabel>   
                            <Grid templateColumns={"1fr 1fr"} gap={5}>
                                {amenities?.map((amenity) => (
                                <Box key={amenity.pk}>
                                    <Checkbox {...register("amenities")} value={amenity.pk}>{amenity.name}</Checkbox>
                                    <FormHelperText>{amenity.description}</FormHelperText>
                                </Box>
                            ))}
                            </Grid>
                        </FormControl>
                        {mutation.isError ? <Text color="red.500" fontSize={"sm"}>Something went wrong </Text>: null}
                <Button type="submit" isLoading={mutation.isLoading} colorScheme={"red"} size="lg" w="100%">Upload</Button>
            </VStack>
            </Container>
        </Box>
        </ProtectedPage>
    );
}