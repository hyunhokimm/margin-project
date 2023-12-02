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

const ComentResult = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gram, setGram] = useState(0);
  const [price, setPrice] = useState(0);
  const { recipePost } = recipeStore();

  const onChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
      setId(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(e.target.value);
    } else if (e.target.name == "gram") {
      setGram(e.target.value);
    }
  };

  const onAdd = () => {
    const el = { id, name, gram, price };
    recipePost(el);
    console.log(id);
    setGram(0);
    setName("");
    setId(name);
    setPrice(0);
  };

  return (
    <div>
      <El>
        <Name type="text" name="name" value={name} onChange={onChange} />
        <Name
          type="number"
          value={gram}
          placeholder="10g"
          name="gram"
          onChange={onChange}
        />
        <Name
          type="number"
          placeholder="가격"
          value={price}
          name="price"
          onChange={onChange}
        />
        <AddButton onClick={onAdd}>추가</AddButton>
      </El>
    </div>
  );
};

export default ComentResult;
