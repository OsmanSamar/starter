import React, { useState } from "react";
import {
  Heading,
  Image,
  Text,
  Card,
  CardBody,
  Center,
  Input,
  Box,
  Grid,
  Button,
} from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useLoaderData, Link } from "react-router-dom";
import { format, isValid } from "date-fns";
import { AddEventModal } from "./AddEventModal";

//To display the fetched events on the users’ screen
export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  //To create a state variable to store the search input,
  const [searchQuery, setSearchQuery] = useState("");

  //To create a function to handle the search input,
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  //To clear the searchbar.
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  //To create a function to filter the events based on the search input
  const filterEvents = (events, categories) => {
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
          // Some() method to check if any of the categories match the search criteria.
          event.categoryIds.some((categoryId) => {
            //The some() method takes a callback function as an argument, which is executed on each element of the array until a match is found.
            const category = categories.find((c) => c.id === categoryId);

            return (
              category &&
              typeof category.name === "string" &&
              category.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }))
      );
    });

    //To map the filtered events to include the category names
    filteredEvents = filteredEvents.map((event) => {
      const categoryNames = event.categoryIds
        .map((categoryIds) => {
          const category = categories.find((c) => c.id === categoryIds);
          return category ? category.name : null;
        })
        .filter((name) => name !== null);

      return {
        ...event,
        categoryNames,
      };
    });

    return filteredEvents;
  };

  return (
    <>
      <AddEventModal />

      <Center
        margin="0.5rem 5%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/**  style={{ position: "relative" }} */}
        <div>
          <Input
            placeholder="Search event..."
            width="40vw"
            h="8vh"
            mt="4"
            mb="2"
            paddingRight="3rem"
            borderRadius="10vh"
            border="none"
            minW={200}
            bg="#FFFFFF"
            value={searchQuery}
            onChange={handleSearchInput}
          />
          {searchQuery && (
            <Button
              top="30%"
              bgColor="white"
              background="none"
              border="none"
              cursor="pointer"
              // position="absolute"
              // right="4"
              onClick={handleClearSearch}
            >
              <FaTimes />
            </Button>
          )}
          <Button
            top="30%"
            background="none"
            border="none"
            bgColor="white"
            cursor="pointer"
            //  position="absolute"
          >
            <FaSearch />
          </Button>
        </div>
      </Center>
      <Heading
        textAlign="center"
        mt="2"
        mb="2"
        bgGradient="linear(to-r, #FF7F50, transparent)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        textShadow="2px 2px 4px #000000"
      >
        {" "}
        List of events
      </Heading>
      {/* To check the length of the filteredEvents array
          if the length is zero, display a message to the user
           otherwise, use the map method to render the events*/}
      <Grid
        templateColumns={{
          //  sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={2}
        p="3"
        justifyContent="center"
      >
        {filterEvents(events, categories).length === 0 ? (
          <Center w="50vw" h="60vh" textAlign="center">
            <Text fontSize={"xl"}>
              Sorry, 🔍 there is no event that matches your search query.
            </Text>
          </Center>
        ) : (
          filterEvents(events, categories).map((event) => (
            <Box
              key={event.id}
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              }}
              cursor="pointer"
            >
              <Link to={`event/${event.id}`}>
                <Card
                  w="250px"
                  h="450px"
                  alignContent="center"
                  mb="12"
                  mt="10"
                  m="15"
                  p="3"
                  bg="#008080"
                  boxShadow="0 5px 15px rgba(0,0,0,0.5)"
                  bgImg="linear-gradient(0deg, #FF7F50 , transparent)"
                >
                  <Image
                    w="320px"
                    h="180px"
                    objectFit="cover"
                    p="2"
                    src={event.image}
                    alt={event.title}
                    borderRadius="4rem 4rem 4rem 4rem "
                  />
                  <CardBody textAlign="center">
                    <Heading fontSize="l" mb="1" color="#ffffff">
                      <Text>
                        Title: <br /> {event.title}
                      </Text>
                    </Heading>
                    {/* 3 */}
                    <Text fontSize="sm" mt="1" color="#0A0A0A">
                      Category: {event.categoryNames.join(", ")}
                    </Text>

                    <Text fontSize="sm" color="gray.600" mt="1">
                      StartTime: <br />{" "}
                      {/* Check the validity of the date value before formatting it */}
                      {isValid(new Date(event.startTime))
                        ? format(
                            new Date(event.startTime),
                            "MMMM d, yyyy h:mm a"
                          )
                        : "Invalid date"}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mt="1">
                      {" "}
                      EndTime: <br />{" "}
                      {isValid(new Date(event.endTime))
                        ? format(new Date(event.endTime), "MMMM d, yyyy h:mm a")
                        : "Invalid date"}
                    </Text>

                    <Text fontSize="sm" mt="1" color="#F3E8EA">
                      Description:
                      <br />
                      {event.description}
                    </Text>
                  </CardBody>
                </Card>
              </Link>
            </Box>
          ))
        )}
      </Grid>
    </>
  );
};
