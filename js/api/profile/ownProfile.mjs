import { load } from "../../storage/index.mjs";
import { authFetch } from "../authFetch.mjs";

const BASE_URL = "https://api.noroff.dev/api/v1"; // Define the base URL

async function fetchUserProfile() {
  const token = load("token");

  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    // Decode the token to extract user information (assuming it's a JWT)
    const userData = decodeToken(token);
    console.log("Decoded user data:", userData); // Log decoded user data
    const username = userData.name; // Assuming username is stored in 'name' field
    console.log("Username:", username); // Log username

    const response = await authFetch(
      `${BASE_URL}/auction/profiles/${username}`,
      {
        // Include the base URL
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profileData = await response.json();
    console.log("Profile data:", profileData);
    displayUserProfile(profileData);
  } catch (error) {
    console.error("Error fetching profile data:", error.message);
  }
}

function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decodedData = JSON.parse(atob(base64));
  return decodedData;
}

function displayUserProfile(profileData) {
  if (!profileData) {
    console.error("Profile data is undefined");
    return;
  }

  const defaultAvatarUrl = "../../../images/BB-logo.png";
  const defaultBannerUrl = "../../../images/Designer.jpeg";

  document.getElementById("username").textContent =
    profileData.name || "Unknown";
  document.getElementById("credits").textContent =
    profileData.credits + "$" || "Credit balance currently unavailable";
  document.getElementById("profileAvatar").src =
    profileData.avatar || defaultAvatarUrl;
  document.getElementById("profileBanner").src = defaultBannerUrl;
  document.getElementById("profileAvatar").classList.add("rounded-circle");
}

window.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
});
