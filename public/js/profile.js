$(document).ready(() => {
  loadPosts();
});

loadPosts = () => {
  $.get("/api/posts", { postedBy: profileUserId }, (results) => {
    outputPosts(results, $(".postsContainer"));
  });
};
