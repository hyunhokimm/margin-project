import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types"; // prop-types 라이브러리를 import합니다.
import instance from "../static/axiosInstance";
import userStore from "../static/store/userStore";

const Material = styled.div`
  border-radius: 10px;
  padding: 0.7rem 0;
  width: 9rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  border: 2px solid #0fade9;
  position: relative;
  margin: 1rem;
`;

const Button = styled.button`
  background-color: #0fade9;
  border: none;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  left: -1.2rem;
  top: -1rem;
`;

const Div = styled.div`
  font-size: 15px;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 17px;
  margin-right: 1rem;
`;

const Weight = styled.span`
  margin-right: 5px;
  color: #b5b4b4;
`;

const Price = styled.span``;

// const BarNumber = styled.span``;

const ElementPrice = (el) => {
  const { userInfo } = userStore();

  const onEle = async () => {
    console.log(userInfo);
    if (!userInfo) return alert("로그인이 필요합니다.");
    // marginInfo 초기화
    const marginInfo = { name: el.name, price: el.price, id: userInfo.id };

    try {
      // 서버로 marginInfo 전송
      const result = await instance.post("/margin/tengram", marginInfo);
      console.log(result);
      userInfo.tengram({ ...result.data });
    } catch (error) {
      console.error("오류 발생:", error.message);
    }
  };

  return (
    <>
      <Material>
        <Button onClick={onEle}>+</Button>
        <Name>{el.name}</Name>
        <div>
          <Div>
            <Weight>10 g</Weight>
            <Price>{el.price} 원</Price>
          </Div>
          {/* <BarNumber>{el.number}</BarNumber> */}
        </div>
      </Material>
    </>
  );
};

ElementPrice.propTypes = {
  name: PropTypes.string.isRequired, // name은 문자열 타입이어야 하며 필수(prop을 반드시 전달해야 함)입니다.
  // weight: PropTypes.string.isRequired, // weight은 숫자 타입이어야 하며 필수입니다.
  price: PropTypes.number.isRequired, // price은 숫자 타입이어야 하며 필수입니다.
  // number: PropTypes.number.isRequired, // number은 숫자 타입이어야 하며 필수입니다.
};

export default ElementPrice;
