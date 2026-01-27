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
