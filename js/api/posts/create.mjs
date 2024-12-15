import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "post";

export async function createPost(postData) {
  const createPostURL = API_SOCIAL_URL + action;

  try {
    const response = await authFetch(createPostURL, {
      method,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
