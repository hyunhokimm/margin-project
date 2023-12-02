import React, { useState } from "react";
import { styled } from "styled-components";
import instance from "../../static/axiosInstance";
import userStore from "../../static/store/userStore";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Form = styled.div`
  margin-top: 8rem;
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const { userInfo, userInfoPost } = userStore();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name == "email") setEmail(value);
    else if (name == "password") setPassword(value);
  };

  const login = async () => {
    if (email == "" || password == "") {
      setErr("형식을 모두 채워주세요.");
      setTimeout(() => {
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
    const user = { email, password };
    try {
      const result = await instance.post("/user/login", { ...user });
      console.log(result);
      userInfoPost(result.data.userInfo);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      setErr(error.response ? error.response.data : null);
      setTimeout(() => {
        setErr("");
      }, 1500);
    }
  };
  return (
    <Wrapper>
      <Form>
        <Title>Log in</Title>
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
          onChange={onChange}
          type="password"
          placeholder="password"
          required
        />
        <Button type="button" onClick={login}>
          login
        </Button>
        {err != null ? (
          <div
            style={{ color: "red", fontSize: "0.8rem", marginBottom: "0.7rem" }}
          >
            {err}
          </div>
        ) : (
          <div>{userInfo?.email}</div>
        )}
        <div style={{ display: "flex", alignItems: "end" }}>
          <P>회원가입이 필요하다면?</P> <A href="/signup">signup</A>
        </div>
      </Form>
    </Wrapper>
  );
};

export default LoginPage;
