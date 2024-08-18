export function postTemplate(postData) {
  const endsAt = postData.endsAt ? postData.endsAt : 0;
  const authorThumbnail = postData.seller.avatar
    ? postData.seller.avatar
    : "https://picsum.photos/id/338/200/300?grayscale&blur=2";

  const mediaHtml = postData.media
    ? `<img src="${postData.media}" class="card-img-top postImg" style="max-height: 150px; max-width: 150px;" alt="${postData.title}">`
    : "";

  return `
      <div class="card mb-5 post" data-post-id="${postData.id}">
        <div class="card-header d-flex align-items-center">
           <img  src="${authorThumbnail}" class=" rounded-circle me-2 sellerAvatar"   alt="Author Thumbnail"
          <span class="fs-2">${postData.seller.name}</span>
        </div>
     
        <div class="card-body">   ${mediaHtml}
          <h5 class="card-title">${postData.title}</h5>
          <p class="card-text">${postData.description}</p>
          <p class="card-text"><small class="text-muted">Created: ${new Date(
            postData.created
          ).toLocaleString()}</small></p>
          <p class="card-text"><small class="text-muted">Updated: ${new Date(
            postData.updated
          ).toLocaleString()}</small></p>
        </div>
        <div class="card-footer">
          <p class="">
            Auction ends at: ${new Date(
              postData.endsAt
            ).toLocaleString()}</small></p>
         
        </div>
        <div class="mx-3 comments-section">
          <div class="comments-banner">
            <h6>Total bids: ${postData._count.bids}</h6>
            </p> <button class="btn btn-danger"> Place a bid</button>
          </div>
         
        </div>
      </div>`;
}

export function renderPostTemplate(postData, parent) {
  parent.innerHTML += postTemplate(postData);
}

export function renderPostTemplates(postDataList, parent) {
  parent.innerHTML = postDataList.map(postTemplate).join("");
}

export function setPostClickListeners() {
  const postElements = document.querySelectorAll(".post");

  postElements.forEach((postElement) => {
    postElement.addEventListener("click", (event) => {
      const postId = event.currentTarget.dataset.postId;
      if (postId) {
        window.location.href = `../../html/listing/index.html?id=${postId}`;
      }
    });
  });
}
