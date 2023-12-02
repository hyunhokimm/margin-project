import React, { useState } from "react";
import styled from "styled-components";
import instance from "../../static/axiosInstance";
import recipeStore from "../../static/store/recipeStore";
import userStore from "../../static/store/userStore";
import SearchResult from "../../component/SearchResult";
import ComentResult from "../../component/ComentResult";

const Wrapper = styled.div`
  width: 80%;
  text-align: center;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;

const El = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Title = styled.input`
  font-size: 2rem;
  height: 3rem;
  border-radius: 10px;
  border: 2px solid #0fade9;
  padding: 0 1rem;
  color: #0fade9;
  margin-bottom: 1rem;
`;

const EleSearch = styled.input`
  font-size: 1.2rem;
  height: 2.3rem;
  width: 70%;
  border-radius: 10px;
  border: 2px solid #0fade9;
  padding: 0 1rem;
  color: #0fade9;
  margin-right: 1rem;
`;
const Name = styled.div`
  font-size: 1.5rem;
`;

const Button = styled.button`
  width: 4rem;
  height: 3rem;
  border-radius: 25px;
  background-color: #0fade9;
  color: white;
  border: 0;
  margin-bottom: 0.7rem;
  cursor: pointer;
`;

const RecipeButton = styled.button`
  background-color: white;
  border: 2px solid #0fade9;
  height: 3rem;
  color: #0fade9;
  border-radius: 20px;
  cursor: pointer;
`;

const Err = styled.div`
  color: red;
  margin-bottom: 0.5rem;
`;

const RecipeMakePage = () => {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [err, setErr] = useState("");

  const [tengramObj, setTengramObj] = useState({});
  const { recipeState, recipeDelete, recipeAllDelete } = recipeStore();
  const { userInfo } = userStore();

  const onChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "search") {
      setSearch(e.target.value);
    }
  };

  const onSearch = async () => {
    if (!search) return;

    try {
      const result = await instance.post("/margin/search", { search });
      console.log(result.data.result);
      setTengramObj(result.data.result);
      setSearch("");
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data || "다시 검색해 주세요.";
      setErr(errorMessage);
      setTimeout(() => {
        setErr("");
      }, 1500);
    }
  };

  const onDelete = (id) => {
    recipeDelete(id);
  };

  const onRecipeSubmit = async () => {
    try {
      setErr("");
      if (!title) {
        setErr("제목을 넣어주세요.");
        setTimeout(() => {
          setErr("");
        }, 1500);
        return;
      }
      if (!userInfo) {
        setErr("로그인 후 이용이 가능합니다.");
        setTimeout(() => {
          setErr("");
        }, 1500);
        return;
      }

      const dataArray = Object.values(recipeState).filter(
        (item) => typeof item === "object"
      );

      const recipe = { title, recipes: dataArray, userInfo }; // 여기서 변경
      console.log(recipe);

      await instance.post("/margin/recipebook", { recipe });

      recipeAllDelete();
    } catch (error) {
      setErr(error.response?.data || "예상치 못한 오류가 발생했습니다.");
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <EleSearch
        type="text"
        placeholder="재료명 10g 단위 검색"
        name="search"
        value={search}
        onChange={onChange}
      />
      <Button onClick={onSearch}>검색</Button>
      <Err>{err}</Err>

      <Title
        placeholder="메뉴명"
        value={title}
        name="title"
        onChange={onChange}
      />
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      {tengramObj ? <SearchResult tengram={tengramObj} /> : <ComentResult />}

      {recipeState.map((el, index) => (
        <El key={index}>
          <Name style={{ display: "none" }}>{el.id}</Name>
          <Name>{el.name}</Name>
          <Name>{el.gram}</Name>
          <Name>{el.price}</Name>
          <Button onClick={() => onDelete(el.id)}>삭제</Button>
        </El>
      ))}
      <hr />

      <El>
        <Name>총</Name>
        <Name>
          {recipeState.reduce((acc, el) => acc + parseFloat(el.gram), 0)}
        </Name>
        <Name>
          {recipeState.reduce((acc, el) => acc + parseFloat(el.price), 0)}
        </Name>
        <RecipeButton onClick={onRecipeSubmit}>레서피 저장</RecipeButton>
      </El>
    </Wrapper>
  );
};

export default RecipeMakePage;
