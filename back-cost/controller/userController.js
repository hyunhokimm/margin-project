const TenGram = require("../model/tengramModel");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.signup = async (user, res) => {
  const { email, password, nickname } = user;
  console.log(email, password, nickname);
  try {
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).send("이미 등록된 이메일 입니다.");
    }
    console.log("통과");
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashPassword,
      nickname,
      createdTime: new Date(),
    });

    // Save the new user to the database
    await newUser.save();

    return res.send("회원등록 성공");
    // Return user information
  } catch (error) {
    return res.status(500).send("사용자 저장 중 오류", error); // Rethrow the error to be caught by the calling function
  }
};

exports.login = async (user, res) => {
  try {
    const { email, password } = user;
    // Find the user by email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).send("등록된 이메일 정보가 없습니다.");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return res.status(401).send("비밀번호를 틀렸습니다.");
    }

    const result = await TenGram.find({ user: foundUser._id })
      .populate("user")
      .exec();
    let tengram = [];
    console.log(result);
    result.forEach((res) => {
      tengram.push({
        id: res._id,
        name: res.name,
        price: res.price,
        gram: res.gram,
      });
    });

    console.log(tengram);

    const userInfo = {
      id: foundUser._id,
      email: foundUser.email,
      nickname: foundUser.nickname,
      tengram,
    };

    res.status(200).send({ userInfo });
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    res.status(500).send({ error: "서버 오류" });
  }
};
