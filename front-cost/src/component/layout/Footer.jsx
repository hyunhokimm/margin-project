import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Foot = styled.div`
  position: fixed;
  height: 2rem;
  padding: 1rem;
  background-color: #0fade9;
  bottom: 0;
  width: 100%;
  display: flex;
`;

const Button = styled.div`
  color: white;
  width: 50%;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Foot>
      <Button onClick={() => navigate("/")}>재료 가격</Button>
      <Button onClick={() => navigate("/price")}>10g당 계산</Button>
      <Button onClick={() => navigate("/basket")}>+담긴 재료</Button>
      <Button onClick={() => navigate("/recipemake")}>레서피 만들기</Button>
      <Button onClick={() => navigate("/recipebook")}>레서피 보관함</Button>
    </Foot>
  );
};

export default Footer;
