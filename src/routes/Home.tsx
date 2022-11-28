import { Box, Grid} from "@chakra-ui/react";
import { useQuery } from '@tanstack/react-query'
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { getRooms } from "../api";
import { Link } from "react-router-dom";
import { IRoomDetail } from "../types";
import { useEffect } from "react";

export default function Home() {
    const { isLoading, data } = useQuery<IRoomDetail[]>(["rooms"], getRooms);

    return (
        <Grid mt={10} px={{
            base: 10, lg: 40,
        }} columnGap={5} rowGap={8} templateColumns={{
            base: "1fr", //모바일
            sm: "1fr 1fr",
            md: "1fr 1fr",
            lg:"repeat(3, 1fr)",
            xl:"repeat(4, 1fr)",
            }}>
            {isLoading ? <>
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
                <RoomSkeleton />
            </> : null}
            {data?.map((room) => (
                <Room
                    key={room.pk}
                    pk={room.pk}
                    imageURL={room.photos[0].file}
                    name={room.name}
                    rating={room.rating}
                    city={room.city}
                    country={room.country}
                    price={room.price}
                />
            ))}
        </Grid>
    )
}