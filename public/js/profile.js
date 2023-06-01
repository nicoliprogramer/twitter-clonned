$(document).ready(() => {
  loadPosts();
});

loadPosts = () => {
  $.get("/api/posts", (results) => {
    outputPosts(results, $(".postsContainer"));
  });
};
