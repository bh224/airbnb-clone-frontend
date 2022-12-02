import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface IRoomProps {
    imageURL: string;
    name: string;
    city: string;
    country: string;
    rating: number;
    price: number;
    pk: number;
    isOwner: boolean;
}

export default function Room({pk, imageURL, name, city, country, rating, price, isOwner}:IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300")
    const navigate = useNavigate()
    const onCameraClick = (event:React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault()
        navigate(`/rooms/${pk}/photos`)
    }
    return (
        <Link to={`/rooms/${pk}`}>
            <VStack alignItems={"flex-start"}>
                <Box position="relative" rounded={"3xl"} overflow={"hidden"} mb={2}>
                    <Image objectFit={"cover"} minH="280"
                        src={imageURL} />
                    <Button onClick={onCameraClick} variant={"unstyled"} position="absolute" top={0} right={0} color="white">
                        { isOwner? <FaCamera size="15px"/> : <FaRegHeart size="15px"/>}
                    </Button>
                </Box>
                <Box w="100%">
                    <Grid templateColumns={"5fr 1fr"} gap={2}>
                        <Text as="b" noOfLines={1} fontSize="md">{name}</Text>
                    <HStack _hover={{ color:"red.200"}} color={"gray"}  spacing={1} alignItems="center">
                        <FaStar size={15} />
                        <Text>{rating}</Text>
                    </HStack>
                    </Grid>
                <Text fontSize={"sm"} color={gray}>{city}, {country}</Text>
                </Box>
                <Text fontSize={"sm"} color={gray}>
                    <Text as="b">{price} </Text>/ night
                </Text>
            </VStack>
        </Link>
    )
}