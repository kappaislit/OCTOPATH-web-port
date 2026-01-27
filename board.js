document.addEventListener("DOMContentLoaded", () => {

const posts = [
  {
    title: "オフィーリアの物語について",
    author: "旅人A",
    date: "2026.01.27",
    body: "最初は控えめな印象だったけど、終盤の強さに心を打たれました。"
  },
  {
    title: "夜のク国BGMが好きすぎる",
    author: "旅人B",
    date: "2026.01.26",
    body: "静かな旋律なのに、どこか切なさがあってずっと聴いてしまう。"
  }
];

const postList = document.getElementById("postList");

function renderPosts() {
  postList.innerHTML = "";

  posts.forEach(post => {
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <h2 class="post-title">${post.title}</h2>
      <p class="post-meta">投稿者：${post.author} ／ ${post.date}</p>
      <p class="post-body">${post.body}</p>
    `;

    postList.appendChild(article);
});
}

/* レンダーポストを呼び出す　これないとダミー２個が最初から表示されなかた　*/
renderPosts();



const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const bodyInput = document.getElementById("bodyInput");
const submitPost = document.getElementById("submitPost");

submitPost.addEventListener("click", () => {
  const newPost = {
    title: titleInput.value,
    author: authorInput.value,
    date: new Date().toISOString().slice(0, 10),
    body: bodyInput.value
  };

  posts.unshift(newPost);
  renderPosts();

  titleInput.value = "";
  authorInput.value = "";
  bodyInput.value = "";
 });

});