import * as templates from "../../templates/index.mjs";

let postsData = [];

// Function to render posts based on the given data
function renderPosts(posts) {
  const postList = document.getElementById("postList");
  postList.innerHTML = ""; // Clear existing posts

  posts.forEach((post) => {
    const postElement = document.createElement("li");
    postElement.classList.add("list-group-item");
    postElement.innerHTML = templates.postTemplate(post);
    postList.appendChild(postElement);
  });
}

// Function to apply search filter
function applySearch() {
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();

  let filteredPosts = postsData;

  // Apply search filter
  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.body.toLowerCase().includes(searchQuery)
    );
  }

  renderPosts(filteredPosts);
}

// Event listener for search input
document.getElementById("searchInput").addEventListener("input", applySearch);

export function setPosts(data) {
  postsData = data;
  renderPosts(postsData); // Initially render all posts
}

export function setupSearchAndFilter() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", applySearch);
}
