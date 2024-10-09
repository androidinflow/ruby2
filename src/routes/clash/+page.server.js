import axios from "axios";
import { CLASH_OF_CLANS_API_KEY } from "$env/static/private";

export async function load() {
  const playerTag = "#GY0Y0G0JY";
  const encodedTag = encodeURIComponent(playerTag);

  try {
    const response = await axios.get(
      `https://api.clashofclans.com/v1/players/${encodedTag}`,
      {
        headers: {
          Authorization: `Bearer ${CLASH_OF_CLANS_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    return {
      player: response.data,
    };
  } catch (error) {
    console.error("Error fetching Clash of Clans data:", error);
    return {
      player: null,
      error: "Failed to fetch player data",
    };
  }
}
