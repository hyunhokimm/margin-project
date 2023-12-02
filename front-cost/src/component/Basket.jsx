import React from "react";
import styled from "styled-components";
import userStore from "../static/store/userStore";
import instance from "../static/axiosInstance";

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  margin: 3rem auto; /* 가로 중앙 정렬 */
`;

const Element = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  font-size: 1.2rem;
  color: #0fade9;
  margin: 0.5rem auto; /* 가로 중앙 정렬 */
`;

const Button = styled.button`
  background-color: white;
  color: #0fade9;
  border: 1.5px solid #0fade9;
  border-radius: 10px;
  cursor: pointer;
`;

const Name = styled.div``;

const Weight = styled.div``;

const Price = styled.div``;

const Basket = () => {
  const { userInfo, userTengramDelete } = userStore();

  const onDelete = async (tengramId) => {
    const info = { userInfo, tengramId };
    try {
      await instance.post("margin/tengram/delete", info);
      userTengramDelete(tengramId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {userInfo ? (
        userInfo.tengram &&
        userInfo.tengram.map((el) => (
          <Element key={el.id}>
            <Name>{el.name}</Name>
            <Weight>{el.gram} g</Weight>
            <Price>{el.price} 원</Price>
            <Button onClick={() => onDelete(el.id)}>삭제</Button>
          </Element>
        ))
      ) : (
        <div>로그인 하시면 재료를 담을수 있습니다..</div>
      )}
    </Wrapper>
  );
};

export default Basket;
