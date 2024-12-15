import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function getOnePost(
  id,
  includeAuthor = true,
  includeComments = true
) {
  if (!id) {
    throw new Error("Get requires a postID");
  }

  const getPostURL = `${API_SOCIAL_URL}/listings/${id}`;

  const params = {};
  if (includeAuthor) {
    params._seller = true;
  }
  if (includeComments) {
    params._bids = true;
  }

  const queryString = new URLSearchParams(params).toString();
  const fullURL = `${getPostURL}?${queryString}`;

  try {
    const response = await authFetch(fullURL);

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMsg}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}
