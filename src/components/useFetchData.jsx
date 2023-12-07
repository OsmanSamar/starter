import { useState, useEffect } from "react";

// Define a custom hook that takes a URL as an argument and returns the data, the loading status, and the error status
const useFetchData = (url) => {
  // Create a state variable to store the data
  const [data, setData] = useState(null);

  // Create a state variable to store the loading status
  const [loading, setLoading] = useState(false);

  // Create a state variable to store the error status
  const [error, setError] = useState(null);

  // Use a useEffect hook to fetch the data from the back-end
  useEffect(() => {
    // Define an async function to fetch the data
    const fetchData = async () => {
      // Set the loading status to true
      setLoading(true);
      // Try to fetch the data
      try {
        // Make a GET request to the back-end
        const response = await fetch(url);
        // Check if the response is ok
        if (response.ok) {
          // Get the data from the response
          const data = await response.json();
          // Set the data state to the data
          setData(data);
          // Set the error state to null
          setError(null);
        } else {
          // If the response is not ok, throw an error
          throw new Error(`Something went wrong: ${response.statusText}`);
        }
      } catch (err) {
        // If there is an error, set the error state to the error message
        setError(err.message);
      }
      // Set the loading status to false
      setLoading(false);
    };
    // Call the fetch data function
    fetchData();
  }, [url]); // Pass the URL as a dependency to run the effect whenever the URL changes

  // Return the data, the loading status, and the error status
  return { data, loading, error };
};

export default useFetchData;
