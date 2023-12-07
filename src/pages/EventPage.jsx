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

//To display the fetched events on the users’ screen
export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);

  return {
    users: await users.json(),
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event, users } = useLoaderData();
  const { eventId } = useParams(); // get the event ID from the URL

  const navigate = useNavigate(); // get the navigate function

  // use a state variable to store the event data
  const [eventData, setEventData] = useState(null);

  // use an effect hook to fetch the event data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`) // use the event ID in the fetch request
      .then((response) => response.json())
      .then((data) => setEventData(data)) // set the event data to the state variable
      .catch((error) => console.error(error)); // handle any errors that might occur
  }, [eventId]); // only run the effect when the event ID changes

  return (
    <>
      <Heading textAlign="center"> Event Details </Heading>
      <Center>
        {eventData ? ( // check if the event data is available
          <Card
            borderRadius="xl"
            w="3xl"
            h="auto"
            mb="3"
            mt="7"
            bgColor="white"
            flexDirection="column"
            cursor="pointer"
            _hover={{ transform: "scale(1.01)" }}
          >
            <CardHeader
              onClick={() => {
                navigate(-1); // go back to the previous page
              }}
            >
              <FaArrowLeft size={14} />
            </CardHeader>

            <Image
              w="100%"
              h="25rem"
              objectFit="cover"
              src={eventData.image}
              alt={eventData.title}
              borderRadius="1rem 1rem 1rem 1rem "
            />
            <CardBody fontFamily="bold">
              <Stack mt="2" pt="5px" textAlign="center">
                <Text fontSize="sm">Title: {eventData.title}</Text>
                <Text>
                  <Link to={`/event/${eventData.eventId}`}></Link>
                </Text>

                <Text fontSize="sm">CategoryIds: {eventData.categoryIds} </Text>

                <Text fontSize="sm" color="gray.500">
                  StartTime:{" "}
                  {/* Check the validity of the date value before formatting it */}
                  {isValid(new Date(eventData.startTime))
                    ? format(
                        new Date(eventData.startTime),
                        "MMMM d, yyyy h:mm a"
                      )
                    : "Invalid date"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {" "}
                  EndTime:{" "}
                  {isValid(new Date(eventData.endTime))
                    ? format(new Date(eventData.endTime), "MMMM d, yyyy h:mm a")
                    : "Invalid date"}
                </Text>
                <text>Description: {eventData.description}</text>

                {/* Find the user who created the event by matching the userId property */}
                {users.map((user) => {
                  if (user.id === eventData.createdBy) {
                    return (
                      <div key={user.id}>
                        {/* Display the user's name and image */}
                        <Text fontSize="sm" color="gray.500">
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
                    <Text fontSize="sm" color="gray.500">
                      Created by: Unknown
                    </Text>
                    <Image
                      w="50px"
                      h="50px"
                      objectFit="cover"
                      src="https://i.imgur.com/6M241Q8.png" // use a placeholder image URL
                      alt="Unknown"
                      borderRadius="50%"
                    />
                  </div>
                )}
              </Stack>
              <EditeventModal event={event} />
            </CardBody>
          </Card>
        ) : (
          <p>Loading...</p> // show a loading message while the event data is being fetched
        )}
      </Center>
    </>
  );
};
