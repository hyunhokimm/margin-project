import React, { useEffect } from "react";
import styled from "styled-components";
import ElementPrice from "../../component/ElementPrice";
import userStore from "../../static/store/userStore";
import noUserMarginStore from "../../static/store/noUserMarginStore";
import instance from "../../static/axiosInstance";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Form = styled.div`
  text-align: center;
  justify-content: center;
  gap: 0.3rem;
  flex-wrap: wrap;
  display: flex;
`;

const Text = styled.div`
  color: #0fade9;
  font-size: 1.3rem;
`;

const ElementPricePage = () => {
  const { userInfo } = userStore();
  const { noUserMarginState, noUserMarginPost } = noUserMarginStore();

  const tengramInfo = async () => {
    try {
      const response = await instance.get("/margin/tengramInfo");
      console.log(response.data);
      noUserMarginPost(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    tengramInfo();
  }, [userInfo]);

  return (
    <Wrapper>
      <Text>10g 당 재료. 사용하는 재료 담기</Text>
      <Form>
        {noUserMarginState.map((element) => (
          <ElementPrice key={element._id} {...element} />
        ))}
      </Form>
    </Wrapper>
  );
};

export default ElementPricePage;
