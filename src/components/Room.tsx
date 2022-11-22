import { Box, Button, Grid, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
    imageURL: string;
    name: string;
    city: string;
    country: string;
    rating: number;
    price: number;
}

export default function Room({imageURL, name, city, country, rating, price}:IRoomProps) {
    const gray = useColorModeValue("gray.600", "gray.300")
    return (
            <VStack alignItems={"flex-start"}>
                <Box position="relative" rounded={"3xl"} overflow={"hidden"} mb={2}>
                    <Image minH="280"
                        src={imageURL} />
                    <Button variant={"unstyled"} position="absolute" top={0} right={0} color="white">
                        <FaRegHeart size="15px"/>
                    </Button>
                </Box>
                <Box>
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
    )
}