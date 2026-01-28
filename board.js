document.addEventListener("DOMContentLoaded", () => {

    



const defaultPosts = [
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

/* ローカルストレージから復元 */
const savedPosts = localStorage.getItem("posts");
const userPosts = savedPosts ? JSON.parse(savedPosts) : [];
let posts = [...defaultPosts, ...userPosts];



const postList = document.getElementById("postList");

function renderPosts() {
  postList.innerHTML = "";

  posts.forEach((post,index) => {
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <h2 class="post-title">${post.title}</h2>
      <p class="post-meta">投稿者：${post.author} ／ ${post.date}</p>
      <p class="post-body">${post.body}</p>
      <button class="burn-btn">焚き火にくべる</button>
    `;

const burnBtn = article.querySelector(".burn-btn");

    burnBtn.addEventListener("click", () => burnPost(index, article));


    postList.appendChild(article);
});
}

/* レンダーポストを呼び出す　これないとダミー２個が最初から表示されなかた　今は初回描画用*/
renderPosts();

const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const bodyInput = document.getElementById("bodyInput");
const submitPost = document.getElementById("submitPost");

submitPost.addEventListener("click", () => {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "";

  if (!titleInput.value || !bodyInput.value) {
    errorMessage.textContent = "あなたの物語を聞かせてください。";
    return;
  }


  const newPost = {
    title: titleInput.value,
    author: authorInput.value || "名もなき旅人",
    date: new Date().toISOString().slice(0, 10),
    body: bodyInput.value
  };

  /* 投稿処理 */
  userPosts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(userPosts));
  posts = [...defaultPosts, ...userPosts];
  renderPosts();

  titleInput.value = "";
  authorInput.value = "";
  bodyInput.value = "";
 });

 /* 投稿を消す */
function burnPost(index, article) {
  const ok = confirm("この記録を焚き火にくべますか？");
  if (!ok) return;


  
  // SE再生
  const fireSound = document.getElementById("fireSound");
  fireSound.currentTime = 0;
  fireSound.play();

  // フェードアウト
  article.classList.add("burning");

  setTimeout(() => {
    if (index < defaultPosts.length) {
      // ダミー → 表示から消すだけ
      posts.splice(index, 1);
    } else {
      // ユーザー投稿
      const userIndex = index - defaultPosts.length;
      userPosts.splice(userIndex, 1);
      localStorage.setItem("posts", JSON.stringify(userPosts));
      posts = [...defaultPosts, ...userPosts];
    }
    renderPosts();
  }, 600);
}





});