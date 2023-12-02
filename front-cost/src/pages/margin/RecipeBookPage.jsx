import React from "react";
import styled from "styled-components";
import RecipeMake from "../../component/RecipeMake";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  gap: 0.3rem;
  flex-wrap: wrap;
  display: flex;
`;

const RecipeBookPage = () => {
  return (
    <Wrapper>
      <RecipeMake />
    </Wrapper>
  );
};

export default RecipeBookPage;
