const express = require("express");
const {
  postMargin,
  tengramSearch,
  noUserPost,
  tengramInfo,
  recipebookPost,
  recipeAll,
  tengramOneDelete,
  tengramSearchSave,
} = require("../controller/marginController");
const marginRoute = express.Router();

//로그인 상태에서 10g 단위 저장하기
marginRoute.post("/tengram", (req, res) => {
  console.log(req.body);
  postMargin(req.body, res);
});

//로그인 하지 않은 상태에서 10g 단위 저장하기
marginRoute.post("/nouser", (req, res) => {
  noUserPost(req.body, res);
});

//로그인 하지 않은 상태에서 모든 10g당 데이터 가져오기
marginRoute.get("/tengramInfo", (req, res) => {
  tengramInfo(res);
});

//10g 단위의 재료 정보 찾기
marginRoute.post("/search", (req, res) => {
  tengramSearch(req, res);
});

//10g 단위의 재료 정보 찾은 후 저장하기
marginRoute.post("/search/save", (req, res) => {
  tengramSearchSave(req.body, res);
});

//레서피 post 요청
marginRoute.post("/recipebook", (req, res) => {
  recipebookPost(req, res);
});

//모든 레서피 가져오기
marginRoute.post("/recipeAll", (req, res) => {
  recipeAll(req.body, res);
});

//10g 하나의 데이터 삭제하기
marginRoute.post("/tengram/delete", (req, res) => {
  tengramOneDelete(req.body, res);
});

module.exports = marginRoute;
