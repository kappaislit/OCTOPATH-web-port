document.addEventListener("DOMContentLoaded", () => {
  let posts = [];

  const postList = document.getElementById("postList");

  async function loadPosts() {
    const res = await fetch("/api/posts");
    posts = await res.json();
    renderPosts();
  }

  function renderPosts() {
    postList.innerHTML = "";

    posts.forEach((post, index) => {
      const article = document.createElement("article");
      article.className = "post";

      article.innerHTML = `
        <h2 class="post-title">${post.title}</h2>
        <p class="post-meta">投稿者：${post.author} ／ ${post.date}</p>
        <p class="post-body">${post.body}</p>
        <button class="burn-btn">焚き火にくべる</button>
      `;

      postList.appendChild(article);
    });
  }

  const burnBtn = article.querySelector(".burn-btn");

burnBtn.addEventListener("click", async () => {
  const ok = confirm("この記録を焚き火にくべますか？");
  if (!ok) return;

  await fetch(`/api/posts/${post.id}`, {
    method: "DELETE"
  });

  article.classList.add("burning");

  setTimeout(() => {
    loadPosts(); // 再取得
  }, 600);
});


  loadPosts();
});
