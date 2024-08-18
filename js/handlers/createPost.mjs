import { createPost } from "../api/posts/create.mjs";

setCreatePostFormListener();

export function setCreatePostFormListener() {
  const form = document.getElementById("createPost");
  if (form) {
    form.addEventListener("submit", async (event) => {
      // Prevent default form submission
      event.preventDefault();

      const formData = new FormData(form);
      const post = {
        title: formData.get("title"),
        body: formData.get("body"),
        tags: formData
          .get("tags")
          .split(",")
          .map((tag) => tag.trim()),
        media: formData.get("media"),
      };

      try {
        const response = await createPost(post);
        console.log("Post created:", response);

        // Show success alert
        alert("Your post has been successfully created.");

        form.reset();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    });
  } else {
    console.error("Form not found!");
  }
}
