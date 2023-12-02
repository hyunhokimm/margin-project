import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Basket from "../../component/Basket";
import instance from "../../static/axiosInstance";
import userStore from "../../static/store/userStore";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  margin: 2rem 0;
  text-align: center;
`;

const Button = styled.button`
  width: 4rem;
  height: 2.6rem;
  border-radius: 25px;
  background-color: #0fade9;
  color: white;
  border: 0;
  margin-bottom: 0.7rem;
  cursor: pointer;
`;

const Input = styled.input`
  border: 2px solid #0fade9;
  border-radius: 20px;
  height: 40px;
  padding: 0 1rem;
  width: 60%;
  font-size: 20px;
  margin-bottom: 3rem;
  margin-right: 0.5rem;
`;

const BasketPage = () => {
  const [search, setSearch] = useState("");
  const [err, setErr] = useState("");
  const { userInfo, userTengramPost } = userStore();

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = async () => {
    if (!search) return;
    if (!userInfo) return setErr("로그인 해주세요.");
    try {
      const searchInfo = { user: userInfo, search };
      const result = await instance.post("/margin/search/save", {
        searchInfo,
      });
      console.log(result.data.result);
      userTengramPost(result.data.result);
    } catch (error) {
      const errorMessage = error.response || "다시 검색해 주세요.";
      console.log(errorMessage);
      setErr(errorMessage);
      setTimeout(() => {
        setErr("");
      }, 1500);
    }
  };
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <div>
        <Input
          value={search}
          onChange={onChange}
          placeholder="검색 후 재료를 담아주세요."
        />
        <Button onClick={onSearch}>검색</Button>
      </div>
      <div>{err}</div>
      <Basket />
    </Wrapper>
  );
};

export default BasketPage;
