import React, { useState, useEffect } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import {
  Heading,
  Image,
  Text,
  Card,
  CardBody,
  Stack,
  Center,
  CardHeader,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { format, isValid } from "date-fns";
import { FaArrowLeft } from "react-icons/fa";
import { EditeventModal } from "./EditEventModal";

import { DeleteEvent } from "./DeleteEvent";

//To fetch the data for the EventPage component before rendering it.
export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData(); // To access the data fetched by loader.
  const { eventId } = useParams(); // To get the eventId from the URL
  const navigate = useNavigate(); // To get the navigate function

  // use a state variable to store the event data. Updated with the fetched data.
  const [eventData, setEventData] = useState(null);

  // To fetch the data for the eventData state variable after the component has been rendered.
  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`) // use the event ID in the fetch request
      .then((response) => response.json())
      .then((data) => setEventData(data)) // set the event data to the state variable
      .catch((error) => console.error(error)); // handle any errors that might occur
  }, [eventId]); // only run the effect when the event ID changes

  // use the category IDs to find the corresponding category names
  const categoryNames = eventData?.categoryIds
    ?.map((categoryId) => {
      const category = categories?.find((c) => c.id === categoryId);
      return category?.name;
    })
    ?.join(", ");

  return (
    <>
      <Heading
        textAlign="center"
        mb="5"
        p="4"
        bgGradient="linear(to-r, #FF7F50, transparent)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        textShadow="2px 2px 4px #000000"
      >
        {" "}
        Event Details
        <br />
      </Heading>
      <Center>
        {eventData ? ( // check if the event data is available
          <Card
            borderRadius="xl"
            W="2xl"
            h="l"
            mb="12"
            mt="10"
            m="20"
            p="8"
            bg="#008080"
            boxShadow="0 5px 15px rgba(0,0,0,0.5)"
            bgImg="linear-gradient(0deg, #FF7F50 , transparent)"
            flexDirection="column"
            cursor="pointer"
            _hover={{ transform: "scale(1.01)" }}
            overflow="visible"
            position="relative"
          >
            <CardHeader
              onClick={() => {
                navigate(-1); // go back to the previous page
              }}
            >
              <FaArrowLeft size={14} />
            </CardHeader>

            <Image
              width="150px "
              height="150px"
              position="absolute"
              top="-60px"
              left="35%"
              right="50%"
              marginLeft="-30px"
              objectFit="cover"
              overflow="hidden"
              borderRadius="2rem 2rem 2rem 2rem "
              src={eventData.image}
              alt={eventData.title}
            />
            <CardBody fontFamily="bold">
              <Stack mt="2" pt="5px" textAlign="center">
                <Text>
                  <Link to={`/event/${eventData.eventId}`}></Link>
                </Text>
                <Heading fontSize="l" mb="1" color="#ffffff">
                  Title: <br /> {eventData?.title}
                </Heading>
                <Text fontSize="sm" mt="1" color="#0A0A0A">
                  {/*  Category: {eventData.categoryIds}{" "}  */}
                  Category: {categoryNames}
                </Text>

                <Text fontSize="sm" color="gray.600" mt="1">
                  StartTime:{" "}
                  {/* Check the validity of the date value before formatting it */}{" "}
                  {/* The eventData variable is initially set to null, and fetching data may take some time to load
                     and trying to access a property of a null object will result in a runtime error.use to avoid this error. */}
                  {isValid(new Date(eventData.startTime))
                    ? format(
                        new Date(eventData?.startTime),
                        "MMMM d, yyyy h:mm a"
                      )
                    : "Invalid date"}
                </Text>
                <Text fontSize="sm" color="gray.600" mt="1">
                  {" "}
                  EndTime:{" "}
                  {isValid(new Date(eventData.endTime))
                    ? format(
                        new Date(eventData?.endTime),
                        "MMMM d, yyyy h:mm a"
                      )
                    : "Invalid date"}
                </Text>
                <Text fontSize="sm" mt="1" color="#F3E8EA">
                  Description: {eventData.description}
                </Text>
                <Text fontSize="sm" mt="1" color="#F3E8EA">
                  Location :{eventData?.location}
                </Text>

                {/* Find the user who created the event by matching the userId property */}
                {users.map((user) => {
                  if (user.id === eventData?.createdBy) {
                    return (
                      <div key={user.id}>
                        {/* Display the user's name and image */}
                        <Text fontSize="sm" mt="1" color="#F3E8EA">
                          Created by: {user.name}
                        </Text>
                        <Image
                          w="50px"
                          h="50px"
                          objectFit="cover"
                          src={user.image}
                          alt={user.name}
                          borderRadius="50%"
                        />
                      </div>
                    );
                  }
                })}

                {/* Check if the eventData.createdBy property is null or undefined */}
                {!eventData.createdBy && (
                  <div>
                    {/* Display a default message and image */}
                    <Text fontSize="sm" color="gray.400">
                      Created by: Unknown
                    </Text>
                    <Image
                      w="50px"
                      h="50px"
                      objectFit="cover"
                      src="https://i.imgur.com/6M241Q8.png"
                      alt="Unknown"
                      borderRadius="50%"
                    />
                  </div>
                )}
              </Stack>
              <EditeventModal />
              <DeleteEvent />
            </CardBody>
          </Card>
        ) : (
          <Text fontSize={"sm"}>Loading...</Text> // show a loading message while the event data is being fetched
        )}
      </Center>
    </>
  );
};
