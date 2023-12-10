import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useState } from "react";

export const DeleteEvent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      // send the delete request to the server
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });

      // handle the response
      if (response.ok) {
        // redirect the user back to the events page
        history.push("/events");
      } else {
        // show an error message
        console.error("Failed to delete event.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        colorScheme="red"
        boxShadow="0 5px 15px rgba(0,0,0,0.5)"
        //bgImg="linear-gradient(0deg, #FF7F50 , transparent)"
        position="absolute"
        bottom="1"
        //right="200"
        right="calc(100% - 130px)"
        onClick={() => setIsOpen(true)}
      >
        Delete Event
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
