import HomeMap from "./_components/map/map";
import MarkerDetails from "./_components/map/marker";

export default async function LandingHome() {
  // Retrieve environment variables
  const url = process.env.API_URL;
  const auth_token = process.env.AUTH_TOKEN;

  // Check if environment variables are available
  if (!url || !auth_token) {
    throw new Error(
      "API_URL or AUTH_TOKEN is not defined in environment variables"
    );
  }

  try {
    // Fetch data from API
    const response = await fetch(url, {
      headers: {
        Authorization: auth_token,
      },
    });

    // Check if the fetch request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Check if the expected data structure is present
    if (!data || !data.message || !Array.isArray(data.data.locations)) {
      throw new Error(
        "Invalid data structure: message or locations are missing"
      );
    }

    return (
      <div>
        <HomeMap data={data} />
      </div>
    );
  } catch (error) {
    // Handle errors gracefully
    return (
      <div>
        <p>Error fetching data: {error.message}</p>
      </div>
    );
  }
}
