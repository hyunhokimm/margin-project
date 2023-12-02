import React, { useState } from "react";
import styled from "styled-components";
import recipeStore from "../static/store/recipeStore";

const El = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Name = styled.input`
  font-size: 1rem;
  height: 2rem;
  width: 20%;
  border-radius: 5px;
  border: 2px solid #0fade9;
  padding: 0 1rem;
  margin-right: 0.8rem;
  margin-bottom: 0.8rem;
`;

const AddButton = styled.button`
  width: 4rem;
  height: 2.5rem;
  border-radius: 30px;
  background-color: #0fade9;
  font-size: 0.7rem;
  color: white;
  border: 0;
  margin-bottom: 0.7rem;
  cursor: pointer;
`;
// Import statements...

const SearchResult = ({ ...tengramObj }) => {
  const [searchId, setSearchId] = useState(tengramObj.tengram._id);
  const [searchName, setSearchName] = useState(tengramObj.tengram.name);
  const [searchGram, setSearchGram] = useState(tengramObj.tengram.gram);
  const [searchPrice, setSearchPrice] = useState(tengramObj.tengram.price);
  const { recipePost } = recipeStore();

  const onSearchChange = (e) => {
    const inputGram = parseFloat(e.target.value);
    setSearchGram(isNaN(inputGram) ? 0 : inputGram);
    setSearchPrice((tengramObj.tengram.price * inputGram) / 10 || 0);
  };

  const onSearchAdd = () => {
    const el = {
      id: searchId,
      name: searchName,
      gram: searchGram,
      price: searchPrice,
    };

    recipePost(el);

    // Reset state after posting
    setSearchId("");
    setSearchName("");
    setSearchGram(0);
    setSearchPrice(0);
  };

  return (
    <div>
      <El>
        <Name type="text" value={searchName} readOnly />
        <Name
          type="number"
          placeholder={tengramObj.tengram.gram}
          name="searchGram"
          value={searchGram}
          onChange={onSearchChange}
        />
        <Name
          type="number"
          placeholder={tengramObj.tengram.price}
          value={searchPrice}
        />
        <AddButton onClick={onSearchAdd}>추가</AddButton>
      </El>
    </div>
  );
};

export default SearchResult;
