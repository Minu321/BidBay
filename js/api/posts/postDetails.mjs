import * as postMethods from "../../api/posts/index.mjs";
import { authFetch } from "../../api/authFetch.mjs";
import { removePost } from "../../api/posts/delete.mjs";

async function loadPostDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id"); // Get the 'id' query parameter

  console.log("Full URL:", window.location.href);
  console.log("Extracted postId:", postId); // Debugging line

  try {
    const post = await postMethods.getOnePost(postId, true);

    console.log("Post data:", post); // Logging the entire post object for debugging
    console.log("Post keys:", Object.keys(post)); // Logging keys of the post object

    // Check if author data exists and display it
    if (post.seller && post.seller.name) {
      document.getElementById("authorName").textContent = post.seller.name;
    } else {
      console.warn("Author data not found or incomplete:", post.seller);
    }
    if (post.seller) {
      document.getElementById("authorAvatar").src = post.seller.avatar;
    }

    document.getElementById("postImage").src = post.media;
    document.getElementById("postTitle").textContent = post.title;
    document.getElementById("postBody").textContent = post.body;
    document.getElementById("postCreated").textContent = `Created: ${new Date(
      post.created
    ).toLocaleString()}`;
    document.getElementById("postUpdated").textContent = `Updated: ${new Date(
      post.updated
    ).toLocaleString()}`;

    const commentsList = document.getElementById("commentsList");

    if (Array.isArray(post.bids)) {
      commentsList.innerHTML = post.bids
        .map(
          (bid) => `
              <li class="list-group-item">
                  <div class="comment-header">
                      Comment by: ${bid.bidderName}
                  </div>
                  <div class="comment-body">Bid amount: ${bid.amount}</div>
                  <div class="comment-time">Bid placed: ${new Date(
                    bid.created
                  ).toLocaleString()}</div>
              </li>
          `
        )
        .join("");
    } else {
      commentsList.innerHTML =
        '<li class="list-group-item">No comments yet</li>';
    }

    // Event listener for delete button
    const deleteButton = document.getElementById("delete-button");

    console.log("Delete Button:", deleteButton); // Log the delete button

    if (deleteButton) {
      deleteButton.addEventListener("click", async (event) => {
        console.log("Delete button clicked"); // Log when the delete button is clicked
        event.preventDefault(); // Prevent default button behavior

        try {
          const deletedPost = await removePost(postId);

          if (deletedPost.success) {
            console.log("Post deleted successfully");
            window.location.href = "../../../../post/index.html";
          } else {
            console.error("Failed to delete post:", deletedPost.message);
          }
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      });
    } else {
      console.warn("Delete button not found");
    }
  } catch (error) {
    console.error("Error loading post details:", error);
  }
}

async function placeBid(event) {
  event.preventDefault();

  const bidAmount = document.getElementById("bidAmount").value;
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    console.error("Post ID is missing in the URL");
    alert("Invalid post ID. Please try again.");
    return;
  }

  if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
    console.error("Invalid bid amount:", bidAmount);
    alert("Please enter a valid bid amount.");
    return;
  }

  try {
    const amount = parseFloat(bidAmount);
    const body = JSON.stringify({ amount });

    console.log(`Request body: ${body}`);

    const response = await authFetch(
      `https://api.noroff.dev/api/v1/auction/listings/${postId}/bids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    console.log(`Response status: ${response.status}`);
    const result = await response.json();
    console.log(`Response data:`, result);

    if (response.ok) {
      alert("Bid placed successfully!");
      loadPostDetails(); // Reload post details to update the bid list
    } else {
      console.error("Failed to place bid:", result);
      if (result.errors) {
        result.errors.forEach((error) => {
          console.error(`Error: ${error.message}`);
        });
      }
      alert("Failed to place bid. Please try again.");
    }
  } catch (error) {
    console.error("Error placing bid:", error);
    alert("An error occurred while placing the bid. Please try again.");
  }
}

document.getElementById("bidForm").addEventListener("submit", placeBid);

loadPostDetails();
