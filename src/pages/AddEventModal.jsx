import React, { useState } from "react";
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

export const AddEventModal = () => {
  // Call the useDisclosure hook and get the isOpen, onOpen, and onClose values
  const { isOpen, onOpen, onClose } = useDisclosure();

  // add the state and logic for the pop-up modal here
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  });

  const toast = useToast(); // call the useToast hook here

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser behavior
    try {
      // get the data from the form
      const { title, image, categoryIds, startTime, endTime } = newEvent;

      console.log(newEvent);

      // create an object with the data
      const eventData = {
        title,
        image,
        categoryIds: categoryIds.split(",").map((s) => parseInt(s)),

        startTime: new Date(startTime),
        endTime: new Date(endTime),
      };

      // Validate the input data
      // Send the new event data to the API or database
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      // Show a success message
      toast({
        // call the toast function here
        title: "Event added.",
        description: "Your event has been successfully created.",
        status: "success",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
      // Close the modal
      onClose();
    } catch (error) {
      // Show an error message
      toast({
        title: "An error occurred.",
        description: "Something went wrong while adding your event.",
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="categoryIds" isRequired>
                <Text>CategoryIds</Text>
                <Input
                  type="text"
                  value={newEvent.categoryIds}
                  onChange={(e) =>
                    setNewEvent((prev) => ({
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
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent((prev) => ({
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
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="image" isRequired>
                <Text>Image URL</Text>
                <Input
                  type="text"
                  value={newEvent.image}
                  onChange={(e) =>
                    setNewEvent((prev) => ({
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
                  value={newEvent.startTime}
                  onChange={(e) =>
                    setNewEvent((prev) => ({
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
                  value={newEvent.endTime}
                  onChange={(e) =>
                    setNewEvent((prev) => ({
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
