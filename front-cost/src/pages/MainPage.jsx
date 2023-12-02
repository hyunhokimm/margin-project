import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Form = styled.div`
  text-align: center;
  padding-top: 20%;
`;
const Intro = styled.div`
  font-size: 25px;
  margin-bottom: 15px;
`;
const Button = styled.button`
  height: 40px;
  border-radius: 20px;
  border: none;
  background-color: #0fade9;
  color: white;
  padding: 0 10px;
  cursor: pointer;
`;

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        <Form>
          <Intro>우리 Margin는 </Intro>
          <Intro>hash 알고리즘을 사용하여</Intro>

          <Intro>여러분의 정보를 </Intro>
          <Intro>안전하게 저장하고 있습니다.</Intro>
          <Button type="button" onClick={() => navigate("/login")}>
            둘러보러 가기
          </Button>
        </Form>
      </Wrapper>
    </>
  );
};

export default MainPage;
