const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// JSON受け取り
app.use(express.json());

// public 公開
app.use(express.static(path.join(__dirname, "public")));

// 🔥 投稿データ（サーバー側）
let posts = [
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
    id: Date.now(),

    title,
    author: author || "名もなき旅人",
    date: new Date().toISOString().slice(0, 10),
    body
  };

  posts.unshift(newPost);
  res.json(newPost);
});

// 起動
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});

// DELETE APIを追加
app.delete("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  posts = posts.filter(post => post.id !== id);

  res.json({ success: true });
});

