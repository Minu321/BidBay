import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings/";

export async function getPosts(includeSeller = true, includeBids = true) {
  let getPostsURL = `${API_SOCIAL_URL}${action}`;

  const queryParams = new URLSearchParams();
  if (includeSeller) queryParams.append("_seller", "true");
  if (includeBids) queryParams.append("_bids", "true");

  if (queryParams.toString() !== "") {
    getPostsURL += "?" + queryParams.toString();
  }

  const response = await authFetch(getPostsURL, {
    method: "get",
  });

  return await response.json();
}

export async function getPost(id) {
  if (!id) {
    throw new Error("Get requires a postID");
  }
  const getPostURL = `${API_SOCIAL_URL}${action}${id}`;

  const response = await authFetch(getPostURL);

  return await response.json();
}
