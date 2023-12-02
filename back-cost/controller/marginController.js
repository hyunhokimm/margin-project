const Recipe = require("../model/recipeModel");
const TenGram = require("../model/tengramModel");
const User = require("../model/userModel");

exports.postMargin = async (margin, res) => {
  console.log(margin);
  const { name, price, id, gram } = margin;
  try {
    const isUser = await User.findOne({ _id: id });

    console.log(isUser);
    if (!isUser) {
      const newTenGram = new TenGram({
        name,
        price: price,
        gram: gram,
        createdTime: new Date(),
      });
      await newTenGram.save();
      res.send("저장완료");
    }

    const newTenGram = new TenGram({
      user: isUser.id,
      name,
      price: price,
      gram: gram,
      createdTime: new Date(),
    });
    await newTenGram.save();

    res.send("저장 완료");
  } catch (error) {
    res.status(500).send("저장 실패");
  }
};

//여기서 부터 하기
exports.userMarginPost = async (user, res) => {
  console.log(user);
  const userResult = await User.findOne({ user });
  console.log(userResult);
  return res.render("/");
};

//비회원 10g당 저장하기
exports.noUserPost = async (margin, res) => {
  try {
    console.log(margin);
    const newTenGram = new TenGram({
      name: margin.name,
      price: margin.price,
      gram: margin.gram,
      createdTime: new Date(),
    });
    const result = await newTenGram.save();
    console.log(result);
    res.send("저장완료");
  } catch (error) {
    res.status(500).send("서버 오류");
  }
};

//
exports.tengramInfo = async (res) => {
  try {
    const tengramInfo = await TenGram.find();
    console.log(tengramInfo);
    return res.send(tengramInfo);
  } catch (err) {
    return res.status(500).send("서버오류");
  }
};

exports.tengramSearch = async (req, res) => {
  try {
    const searchData = req.body;
    console.log(searchData);
    // searchData를 사용하여 검색 등의 작업 수행
    const result = await TenGram.findOne({ name: searchData.search });
    if (!result) return res.status(400).send("찾고자 하는 재료가 없습니다.");

    // 응답 전송 (예시: 검색된 결과를 JSON 형태로 전송)
    res.status(200).json({ result });
  } catch (error) {
    console.error("tengramSearch 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.recipebookPost = async (req, res) => {
  try {
    const { title, recipes, userInfo } = req.body.recipe;

    // 동시에 처리될 프로미스 배열 생성
    const savePromises = recipes.map(async (recipe) => {
      const gram = 10;
      const price = Math.round((recipe.price / recipe.gram) * 10);

      const newTengram = new TenGram({
        name: recipe.name,
        price: price,
        gram: gram,
      });

      await newTengram.save();
    });

    // 모든 프로미스가 완료될 때까지 기다림
    await Promise.all(savePromises);

    // TenGram 저장 후 Recipe 저장
    const newRecipe = new Recipe({
      user: userInfo.id,
      title: title,
      recipe: recipes,
    });

    await newRecipe.save();

    res.send("저장완료");
  } catch (error) {
    console.error("tengramSearch 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.recipeAll = async (user, res) => {
  try {
    console.log(user.id);
    const result = await Recipe.find({ user: user.id });
    console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.tengramOneDelete = async (userInfo, res) => {
  try {
    console.log(userInfo);
    const result = await TenGram.deleteOne({
      user: userInfo.userInfo.id,
      _id: userInfo.tengramId,
    });
    console.log(result);
    if (result.deletedCount === 1) {
      res.send(`name ${userInfo.tengramId} 삭제 성공`);
    } else {
      res.status(400).send("삭제 실패");
    }
  } catch (error) {
    res.status(500).send("서버오류");
  }
};

exports.tengramSearchSave = async (info, res) => {
  try {
    const { searchInfo } = info;
    // searchData를 사용하여 검색 등의 작업 수행

    const search = await TenGram.findOne({ name: searchInfo.search });

    console.log(search);
    const newTenGram = new TenGram({
      user: searchInfo.user.id,
      name: search.name,
      price: search.price,
      gram: search.gram,
      createdTime: new Date(),
    });
    const result = await newTenGram.save();

    // 응답 전송 (예시: 검색된 결과를 JSON 형태로 전송)
    res.status(200).json({ result });
  } catch (error) {
    console.error("tengramSearch 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};
