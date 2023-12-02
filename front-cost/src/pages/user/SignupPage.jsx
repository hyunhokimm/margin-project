import React, { useState } from "react";
import { styled } from "styled-components";
import instance from "../../static/axiosInstance";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Form = styled.div`
  margin-top: 6rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  height: 40px;
  width: 60%;
  font-size: 15px;
  border-radius: 15px;
  border: none;
  padding: 0 1rem;
`;

const Button = styled.button`
  background-color: #0fade9;
  width: 60%;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;
const P = styled.div`
  font-size: 12px;
  margin-right: 4px;
`;
const A = styled.a`
  font-size: 12px;
`;

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "rePassword") setRePassword(value);
    else if (name === "nickname") setNickname(value);
  };

  const onclick = () => {
    if (email == "" || password == "" || rePassword == "" || nickname == "") {
      setErr("형식을 모두 채워주세요.");
      setTimeout(() => {
        setErr("");
      }, 1500);
      return;
    }
    if (password != rePassword) {
      setErr("비밀번호는 같아야 합니다.");
      setTimeout(function () {
        setErr("");
      }, 1500);
      return;
    }
    if (!email.includes("@")) {
      setErr("이메일 형식에 맞지 않습니다.");
      setTimeout(function () {
        setErr("");
      }, 1500);
      return;
    }
    const user = { email, password, nickname };
    console.log(user);
    instance
      .post("/user/signup", { ...user })
      .then((result) => {
        console.log(result);
        setErr("회원 가입 성공");
        setTimeout(() => {
          location.href = "login";
        }, 1500);
      })
      .catch((err) => {
        setErr(err.response.data);
        setTimeout(() => {
          setErr("");
        }, 1500);
      });
  };

  return (
    <Wrapper>
      <Form>
        <Title>Sign up</Title>
        <Input
          value={email}
          name="email"
          type="email"
          onChange={onChange}
          placeholder="email"
          required
        />
        <Input
          value={password}
          name="password"
          type="password"
          onChange={onChange}
          placeholder="password"
          required
        />
        <Input
          value={rePassword}
          name="rePassword"
          type="password"
          onChange={onChange}
          placeholder="Re password"
          required
        />
        <Input
          value={nickname}
          name="nickname"
          onChange={onChange}
          type="text"
          placeholder="nickname"
          required
        />
        <Button type="button" onClick={onclick}>
          sign up
        </Button>
        {err ? (
          <div
            style={{ color: "red", fontSize: "1rem", marginBottom: "0.7rem" }}
          >
            {err}
          </div>
        ) : (
          <div></div>
        )}
        <div style={{ display: "flex", alignItems: "end" }}>
          <P>회원가입이 되어있다면?</P> <A href="/login">login</A>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SignupPage;
