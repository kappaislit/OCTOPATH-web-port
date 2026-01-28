const express = require("express");
const app = express();
const PORT = 3000;

// JSONを受け取れるようにする
app.use(express.json());

// テスト用ルート
app.get("/", (req, res) => {
  res.send("サーバー起動中 🔥");
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
