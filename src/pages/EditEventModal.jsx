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
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);

  return {
    event: await event.json(),
  };
};

export const EditeventModal = () => {
  const { event } = useLoaderData(); // gives the event data.

  // this creates and initializes the state variable with the event data.
  const [editEventData, setEditEventData] = useState(event);
  console.log(event);

  // Use the useEffect hook to get the Event data
  useEffect(() => {
    setEditEventData(event);
  }, [event]); // only run the effect when the event changes.

  // Call the useDisclosure hook and get the isOpen, onOpen, and onClose values.
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast(); // call the useToast hook here

  //////////////////////////////////////////////////////////////////////////

  // const [updatedEevent, setupdatedEevent] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser behavior
    try {
      // get the data from the form

      const {
        title,
        image,
        categoryIds,
        startTime,
        endTime,
        location,
        description,
      } = editEventData;
      console.log(editEventData);

      // create an object with the data
      const eventData = {
        title,
        image,
        categoryIds: categoryIds.split(",").map((s) => parseInt(s)),
        description,
        location,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      };

      // Send the Updated event data to the API or database
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      ////////////////////////////////////////////////

      // handle the response
      const data = await response.json();
      console.log(data);

      /////////////////////////////////////////////////////////

      // Show a success message
      toast({
        // call the toast function here
        title: "Event edited.",
        description: "Your event has been successfully edited.",
        status: "success",
        duration: 3000000,
        //position: "bottom-left",
        position: "bottom-left",
        isClosable: true,
      });
      // Close the modal
      onClose();
      // refresh the page
      // window.location.reload();
    } catch (error) {
      // Show an error message
      toast({
        title: "An error occurred.",
        description: "Something went wrong while editing your event.",
        status: "error",
        duration: 3000000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        colorScheme="teal"
        onClick={onOpen}
        position="fixed"
        bottom="1"
        right="1"
      >
        Edit an event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
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
            <Button colorScheme="teal" type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
