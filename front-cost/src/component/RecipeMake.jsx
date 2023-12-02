import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../static/axiosInstance";
import userStore from "../static/store/userStore";

const Wrapper = styled.div`
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
`;

const Weight = styled.div``;

const Price = styled.div``;

const Name = styled.div``;

const Recipe = styled.div`
  width: 25%;
  border: 1px solid #0fade9;
  border-radius: 25px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;

const RecipeMake = () => {
  const { userInfo } = userStore();
  const [recipes, setRecipes] = useState([]);

  const recipePost = async () => {
    try {
      if (!userInfo) return;
      const result = await instance.post("/margin/recipeAll", { ...userInfo });
      console.log(result.data);
      setRecipes(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    recipePost();
  }, []);

  return (
    <Wrapper>
      {userInfo ? (
        recipes.map((recipe) => (
          <Recipe key={recipe._id}>
            <Title>{recipe.title}</Title>
            {recipe.recipe.map((reci) => (
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                key={reci.id}
              >
                <Name>{reci.name}</Name>
                <Weight>{reci.gram}</Weight>
                <Price>{reci.price}</Price>
              </div>
            ))}
          </Recipe>
        ))
      ) : (
        <div>로그인 후 사용 가능합니다.</div>
      )}
    </Wrapper>
  );
};

export default RecipeMake;
