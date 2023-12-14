import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Text,
  Input,
  useToast,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import { useLoaderData, useNavigate } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);

  return {
    event: await event.json(),
  };
};

export const EditeventModal = () => {
  const navigate = useNavigate(); //To relaoed the page.

  const { event } = useLoaderData(); //To gives the event data.
  event.startTime = new Date(event.startTime).toISOString().slice(0, 16); //toISOString() method to convert a date object to the required format.
  event.endTime = new Date(event.endTime).toISOString().slice(0, 16);

  // To Make the pop-up modal responsive.
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  //To call the useDisclosure hook and get the isOpen, onOpen, and onClose values.
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast(); // call the useToast hook here.

  //To creates and initializes the state variable with the event data.
  const [editEventData, setEditEventData] = useState(event);
  // console.log(event);

  //Use the useEffect hook to get the Event data
  useEffect(() => {
    setEditEventData(event);
  }, [event]); // only run the effect when the event changes.

  const handleUpdate = async (e) => {
    e.preventDefault(); //To prevent the default browser behavior of reloading the page when the form is submitted.
    try {
      //To get the data from the form
      const {
        title,
        image,
        categoryIds,
        startTime,
        endTime,
        location,
        description,
      } = editEventData;
      //console.log(editEventData);

      //To creates a copy of the editEventData object using the spread operator
      const eventData = {
        ...editEventData,
      };
      console.log(eventData);

      //To send a PUT request to the backend API to update the data.
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      // response.json();

      if (!response.ok) {
        throw new Error("Failed to update the data");
      }

      //To handle the response.
      const data = await response.json();
      console.log(data);

      //To show a success message.
      toast({
        //call the toast function here.
        title: "Event edited.",
        description: "Your event has been successfully edited.",
        status: "success",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });

      //Close the modal.
      onClose();

      //To reload the page after a delay of 2 seconds.
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.log(error);
      // Show an error message.
      toast({
        title: "An error occurred.",
        description: "Something went wrong while editing your event.",
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        colorScheme="teal"
        bg="#008080"
        boxShadow="0 5px 15px rgba(0,0,0,0.5)"
        bgImg="linear-gradient(0deg, #FF7F50 , transparent)"
        position="absolute"
        bottom="1"
        right="2.5"
        onClick={onOpen}
      >
        Edit an Event
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={isSmallScreen ? "sm" : "md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Edit an Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdate}>
              <FormControl id="categoryIds" isRequired>
                <Text>CategoryIds</Text>
                <Input
                  type="text"
                  value={editEventData.categoryIds}
                  onChange={(e) =>
                    setEditEventData((prev) => ({
                      ...prev,
                      categoryIds: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="title" isRequired>
                <Text>Title</Text>
                <Input
                  type="text"
                  value={editEventData.title}
                  onChange={(e) =>
                    setEditEventData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <Text>Description</Text>
                <Input
                  type="text"
                  value={editEventData.description}
                  onChange={(e) =>
                    setEditEventData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl id="location" isRequired>
                <Text>Location</Text>
                <Input
                  type="text"
                  value={editEventData.location}
                  onChange={(e) =>
                    setEditEventData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="image" isRequired>
                <Text>Image URL</Text>
                <Input
                  type="text"
                  value={editEventData.image}
                  onChange={(e) =>
                    setEditEventData((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="startTime" isRequired>
                <Text>Start time</Text>
                <Input
                  type="datetime-local"
                  value={editEventData.startTime}
                  onChange={(e) =>
                    setEditEventData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl id="endTime" isRequired>
                <Text>End time</Text>
                <Input
                  type="datetime-local"
                  value={editEventData.endTime}
                  onChange={(e) =>
                    setEditEventData((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" type="submit" onClick={handleUpdate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
