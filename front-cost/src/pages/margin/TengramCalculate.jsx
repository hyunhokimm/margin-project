import React, { useState } from "react";
import styled from "styled-components";
import instance from "../../static/axiosInstance";
import userStore from "../../static/store/userStore";

const Wrapper = styled.div`
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 6rem auto;
  align-items: center;
`;

const Input = styled.input`
  border: 2px solid #0fade9;
  border-radius: 15px;
  height: 3rem;
  padding: 0 1rem;
  width: 100%;
  font-size: 20px;
  margin-bottom: 0.8rem;
`;

const Button = styled.button`
  border-radius: 20px;
  height: 3rem;
  width: 50%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  border: 2px solid #0fade9;
  font-size: 20px;
  cursor: pointer;
  color: #0fade9;
`;

const Text = styled.div``;

const Save = styled.button`
  position: relative;
  right: -9rem;
  top: 2rem;
  background-color: #0fade9;
  height: 5rem;
  width: 5rem;
  border-radius: 3rem;
  color: white;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  border: 0;
  font-weight: 700;
  font-size: 1.2rem;
`;

const Err = styled.div`
  font-size: 0.9rem;
  color: red;
`;

const TengramCalculate = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");
  const { userInfo, userInfoPost } = userStore();

  const onChange = (e) => {
    setResult("");
    const { name, value } = e.target;
    if (name == "name") setName(value);
    else if (name == "weight") setWeight(parseInt(value));
    else if (name == "price") setPrice(parseInt(value));
  };

  const calculate = async () => {
    if (name == "" || weight == "" || price == "")
      return setErr("빈 곳을 채워주세요.");
    const gram = price / weight;
    const result = gram * 10;
    setResult(Math.floor(result));
    //
  };

  const marginPostRequest = async () => {
    let margin;
    if (userInfo) {
      margin = { id: userInfo.id, name, price: result, gram: 10 };
      try {
        const res = await instance.post("/margin/tengram", margin);
        console.log(res.data);
        userInfoPost(margin);
      } catch (error) {
        console.log(error);
      }
    } else {
      margin = { name, price: result, gram: 10 };
      console.log(margin);
      const res = await instance.post("/margin/nouser", margin);
      console.log(res);
    }

    setName("");
    setPrice("");
    setWeight("");
    setResult("");
    setErr("저장완료");
    setTimeout(() => {
      setErr("");
    }, 1500);
  };

  return (
    <Wrapper>
      <Input
        value={name}
        name="name"
        onChange={onChange}
        placeholder="재료명"
      />
      <Input
        value={weight}
        name="weight"
        type="number"
        onChange={onChange}
        placeholder="용량(g)"
      />
      <Input
        value={price}
        type="number"
        name="price"
        onChange={onChange}
        placeholder="가격"
      />
      <Button type="button" onClick={calculate}>
        계산하기
      </Button>
      {err ? <Err>{err}</Err> : null}
      <Text>
        {result ? (
          <div>
            <div> {`${name}은 10g당 ${result} 원 입니다.`}</div>
            <Save type="button" onClick={marginPostRequest}>
              담기
            </Save>
          </div>
        ) : (
          "10g 단위로 계산됩니다."
        )}
      </Text>
    </Wrapper>
  );
};

export default TengramCalculate;
