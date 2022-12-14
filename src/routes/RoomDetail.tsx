import { useState } from "react";
import { Avatar, Box, Button, Container, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom"
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Helmet } from 'react-helmet';
import "../calendar.css";

export default function RoomDetail() {
    const {roomPk} = useParams()
    const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData } = useQuery<IReview[]>([`rooms`, roomPk, `reviews`], getRoomReviews)
  const [dates, setDates] = useState<Date[]>();
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(['checking', roomPk, dates], checkBooking, {
    cacheTime: 0,
    enabled: dates !== undefined
  })
  console.log(checkBookingData)
    return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0,1,2,3,4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 0 ?
                <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src={data?.photos[index].file}
              /> : null}
            </Skeleton>
          </GridItem>
        ))}
        </Grid>
        
      <Grid gap={20} templateColumns={"2fr 1fr"} w="100%">
        
      <Box>
          <HStack width={"70%"} justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"xl"} w="100%">
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>
                    {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>???</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar name={data?.owner.name} size={"lg"} src={data?.owner.avatar} />
          </HStack>
        
          <Box mt={10} width={"50%"}>
      <Heading mb={5} fontSize={"2xl"}>
        <HStack>
          <FaStar /> <Text>{data?.rating}</Text>
          <Text>???</Text>
          <Text>
            {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
          </Text>
        </HStack>
      </Heading>
      <Container mt={16} maxW="container.lg" marginX="none">
        <Grid gap={10} templateColumns={"1fr 1fr"}>
          {reviewsData?.map((review, index) => (
            <VStack alignItems={"flex-start"} key={index}>
              <HStack>
                <Avatar
                  name={review.user.name}
                  src={review.user.avatar}
                  size="md"
                />
                <VStack spacing={0} alignItems={"flex-start"}>
                  <Heading fontSize={"md"}>{review.user.name}</Heading>
                  <HStack spacing={1}>
                    <FaStar size="12px" />
                    <Text>{review.rating}</Text>
                  </HStack>
                </VStack>
              </HStack>
              <Text>{review.payload}</Text>
            </VStack>
          ))}
        </Grid>
      </Container>
            </Box>
          </Box>
          <Box pt={10}>
            <Calendar onChange={setDates}
              selectRange minDate={new Date()} minDetail="month" next2Label={null} prev2Label={null} maxDate={new Date(Date.now() + (60 * 60 * 24 * 7 * 4 * 6 * 1000))} />
            <Button disabled={!checkBookingData?.ok} isLoading={isCheckingBooking} mt={5} w="100%" color={"red"}>Make Booking</Button>
            {!checkBookingData?.ok  && !isCheckingBooking ? <Text textAlign={"center"} fontSize={"sm"} color="red">Can't book on those dates</Text> : null}
          </Box>
        </Grid>
      
      </Box>
    )
}