const postContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
};

const showPosts = async () => {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `<div class="post-body">${post.body}</div>`;
    postContainer.appendChild(postEl);
  });
};

const showLoading = () => {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 2000);
};

showPosts();
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    showLoading();
  }
});
