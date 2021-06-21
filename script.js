const suggestions = [
  {
    id: "1",
    value: "Watches",
  },
  {
    id: "2",
    value: "TVs",
  },
  {
    id: "3",
    value: "Computers",
  },
  {
    id: "4",
    value: "Laptops",
  },
  {
    id: "5",
    value: "Washing Machines",
  },
];
const postContainer = document.getElementById("posts-container");
const suggestionsContainer = document.getElementById("suggestions-container");
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

const getSuggestions = ({ target }) => {
  const searchTerm = target.value;
  const pattern = new RegExp(searchTerm, "i");
  if (!searchTerm) {
    suggestionsContainer.innerHTML = "";
  } else {
    let filteredSugggestions = suggestions.filter((suggestion) =>
      pattern.test(suggestion.value)
    );
    suggestionsContainer.innerHTML = "";
    filteredSugggestions.forEach((suggestion) => {
      const suggestionEl = document.createElement("div");
      suggestionEl.classList.add("suggestion-body");
      suggestionEl.innerHTML = `<div class="suggestion-content">${suggestion.value}</div>`;
      suggestionsContainer.appendChild(suggestionEl);
    });
  }
};

const debounce = (fn, delay) => {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
};

showPosts();
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    showLoading();
  }
});
filter.addEventListener("keyup", debounce(getSuggestions, 500));
