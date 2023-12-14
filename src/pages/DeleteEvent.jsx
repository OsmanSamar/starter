import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);

  return {
    event: await event.json(),
  };
};

export const DeleteEvent = () => {
  const navigate = useNavigate(); //Relaoed the page.

  const { event } = useLoaderData(); // gives the event data.

  const [isOpen, setIsOpen] = useState(false);

  // To Make the pop-up modal responsive.
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const toast = useToast(); //To call the useToast hook.

  const onClose = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      //To send the delete request to the server
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      //To handle the response
      if (response.ok) {
        // Show a success message.
        toast({
          //To call the toast function.
          title: "Event deleted.",
          description: "Your event has been successfully deleted.",
          status: "success",
          duration: 3000,
          position: "bottom-left",
          isClosable: true,
        });

        // Close the modal.
        onClose();
        //To redirect the user back to the events page after a delay of 2 seconds.
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        // show an error message.
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
        position="absolute"
        bottom="1"
        right="calc(100% - 130px)"
        left="2.5"
        width="37%"
        height="auto"
        padding="10px"
        fontSize="16px"
        style={{
          "@media only screen and (max-width: 600px)": {
            maxWidth: "50%",
          },
        }}
        onClick={() => setIsOpen(true)}
      >
        Delete Event
      </Button>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        size={isSmallScreen ? "sm" : "md"}
      >
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
