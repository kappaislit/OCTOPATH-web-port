document.addEventListener("DOMContentLoaded", () => {
  let posts = [];

  const postList = document.getElementById("postList");

  async function loadPosts() {
    const res = await fetch("/api/posts");
    posts = await res.json();
    renderPosts();
  }

const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const bodyInput = document.getElementById("bodyInput");
const submitPost = document.getElementById("submitPost");

submitPost.addEventListener("click", async () => {
  if (!titleInput.value || !bodyInput.value) {
    alert("タイトルと本文は必須です");
    return;
  }

  await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleInput.value,
      author: authorInput.value,
      body: bodyInput.value
    })
  });

  titleInput.value = "";
  authorInput.value = "";
  bodyInput.value = "";

  loadPosts(); // ← 今の設計に完全に合ってる
});



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

      const burnBtn = article.querySelector(".burn-btn");

      burnBtn.addEventListener("click", async () => {
  const ok = confirm("この記録を焚き火にくべますか？");
  if (!ok) return;

  // SE追加
  const fireSound = document.getElementById("fireSound");
fireSound.currentTime = 0;
fireSound.play();

  await fetch(`/api/posts/${post.id}`, {
    method: "DELETE"
  });

  article.classList.add("burning");

  setTimeout(() => {
    loadPosts(); // 再取得
  }, 600);
});

      postList.appendChild(article);
    });
  }

  loadPosts();
});
