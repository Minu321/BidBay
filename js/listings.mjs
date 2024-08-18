import * as postMethods from "./api/posts/index.mjs";
import { setCreatePostFormListener } from "./handlers/createPost.mjs";
import { setUpdatePostListener } from "./handlers/updatePost.mjs";
import { setPostClickListeners } from "../js/templates/post.mjs";
import * as templates from "./templates/index.mjs";

const path = location.pathname;

if (path == "/post/create/") {
  setCreatePostFormListener();
} else if (path == "/post/edit/") {
  setUpdatePostListener();
}

postMethods.getPosts().then(console.log);

async function testTemplate() {
  const posts = await postMethods.getPosts();
  const container = document.querySelector("#post");
  templates.renderPostTemplates(posts, container);
  setPostClickListeners(); // Set up click event listeners for posts
}

testTemplate();

export function postTemplate(postData) {
  console.log(postData);
}
