export async function sendmsgtooenAI(message) {
  try {
    const response = await fetch("http://localhost:3001/responses"); // Ensure the URL matches
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server.");
    }

    const data = await response.json();

    // Match user input with the response
    const match = data.find((item) =>
      item.prompt.toLowerCase() === message.toLowerCase()
    );

    return match ? match.response : "Sorry, I don't have an answer for that.";
  } catch (error) {
    console.error("Error in sendmsgtooenAI:", error);
    return "There was an error fetching the response.";
  }
}
