import React, { useState } from "react";
import {
  Heading,
  Image,
  Text,
  Card,
  CardBody,
  HStack,
  Center,
  Input,
  Flex,
} from "@chakra-ui/react";
//import { SearchIcon } from "@chakra-ui/icon";
import { useLoaderData, Link } from "react-router-dom";
import { format, isValid } from "date-fns";
import { AddEventModal } from "./AddEventModal";

//import SearchIcon from "../assets/search.svg";
//import { CiSearch } from "react-icons/ci";

//To display the fetched events on the users’ screen
export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");

  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();

  //Create a state variable to store the search input,
  const [searchQuery, setSearchQuery] = useState("");

  //Create a function to handle the search input,
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  //Create a function to filter the events based on the search input

  const filterEvents = (events) => {
    // store the result of the filterEvents function in a variable
    let filteredEvents = events.filter((event) => {
      return (
        // check if the name property exists and is a string before calling toLowerCase
        (typeof event.title === "string" &&
          event.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        // check if the description property exists and is a string before calling toLowerCase
        (typeof event.description === "string" &&
          event.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        // check if the categoryIds property exists and is an array before calling toString and toLowerCase
        (Array.isArray(event.categoryIds) &&
          event.categoryIds
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
      );
    });

    // return the filteredEvents array
    return filteredEvents;
  };

  return (
    <>
      <Center>
        <Input
          placeholder="Search..."
          width="40vw"
          minW={200}
          padding="2"
          margin="0.5rem 5%"
          bg="white"
          value={searchQuery}
          onChange={handleSearchInput}
        />

        {/*<Icon
          as={SearchIcon}
          boxSize={6} // change the icon size
          color="blue.500" // change the icon color
          onClick={() => alert("Clicked")} // add an event handler
  />*/}
      </Center>

      <AddEventModal />

      <Heading textAlign="center"> List of events</Heading>

      {/* check the length of the filteredEvents array
          if the length is zero, display a message to the user
           otherwise, use the map method to render the events*/}
      <Flex>
        <Card
          w="3xl"
          h="auto"
          cursor="pointer"
          _hover={{ transform: "scale(1.01)" }}
        >
          <CardBody>
            <HStack mt="2" pt="5px" textAlign="center">
              {filterEvents(events).length === 0 ? (
                <p>Sorry, there is no event that matches your search query.</p>
              ) : (
                filterEvents(events).map((event) => (
                  <div key={event.id} className="event">
                    <Link to={`event/${event.id}`}>
                      <Image
                        w="100%"
                        h="100px"
                        objectFit="cover"
                        src={event.image}
                        alt={event.title}
                        borderRadius="1rem 1rem 1rem 1rem "
                      />

                      <Text fontSize="sm">
                        CategoryIds: {event.categoryIds}{" "}
                      </Text>
                      <Heading>
                        <Text fontSize="sm">Title: {event.title}</Text>
                      </Heading>
                      <Text fontSize="sm" color="gray.500">
                        StartTime:{" "}
                        {/* Check the validity of the date value before formatting it */}
                        {isValid(new Date(event.startTime))
                          ? format(
                              new Date(event.startTime),
                              "MMMM d, yyyy h:mm a"
                            )
                          : "Invalid date"}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {" "}
                        EndTime:{" "}
                        {isValid(new Date(event.endTime))
                          ? format(
                              new Date(event.endTime),
                              "MMMM d, yyyy h:mm a"
                            )
                          : "Invalid date"}
                      </Text>

                      <Text fontSize="sm">Description:{event.description}</Text>
                    </Link>
                  </div>
                ))
              )}
            </HStack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};
