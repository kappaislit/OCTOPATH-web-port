const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// public フォルダを公開する
app.use(express.static(path.join(__dirname, "public")));

// トップページ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 掲示板ページ
app.get("/board", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "board.html"));
});

app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
