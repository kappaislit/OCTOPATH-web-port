const fs = require("fs");

const DATA_PATH = "./posts.json";




const { randomUUID } = require("crypto");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// JSON受け取り
app.use(express.json());

// public 公開
app.use(express.static(path.join(__dirname, "public")));

// 🔥 投稿データ（サーバー側）
let posts = [];
if (fs.existsSync(DATA_PATH)) {
  posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}else{
  posts = [
  {
    id: 1,
    title: "オフィーリアの物語について",
    author: "旅人A",
    date: "2026.01.27",
    body: "最初は控えめな印象だったけど、終盤の強さに心を打たれました。"
  },
  {
    id: 2,
    title: "夜のク国BGMが好きすぎる",
    author: "旅人B",
    date: "2026.01.26",
    body: "静かな旋律なのに、どこか切なさがあってずっと聴いてしまう。"
  }
];
savePosts();
}

function savePosts() {
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
}


// 投稿一覧
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// 新規投稿
app.post("/api/posts", (req, res) => {
  const { title, author, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: "タイトルと本文は必須です" });
  }

  const newPost = {

    /* id付与 */
    id: randomUUID(),
    title,
    author: author || "名もなき旅人",
    date: new Date().toISOString().slice(0, 10),
    body
  };

  posts.unshift(newPost);
  savePosts();
  res.json(newPost);
  

});

// 起動
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});

// DELETE APIを追加
app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  posts = posts.filter(post => post.id !== id);
savePosts();
res.json({ success: true });
});

