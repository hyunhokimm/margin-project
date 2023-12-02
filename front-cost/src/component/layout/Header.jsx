import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import userStore from "../../static/store/userStore";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #0fade9;
  margin-bottom: 1.5rem;
`;

const Logo = styled.button`
  background-color: #0fade9;
  border: none;
  font-weight: bold;
  font-size: 1.3rem;
  color: white;
  cursor: pointer;
`;

const Right = styled.div``;

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, userLogout } = userStore();

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const leaveUser = () => {
    userLogout();
    console.log({ ...userInfo });
  };

  return (
    <>
      <Wrapper>
        <Logo
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Margin
        </Logo>
        <Right>
          {userInfo ? (
            <div>
              <Logo type="button" onClick={leaveUser}>
                Logout
              </Logo>
              <Logo type="button" onClick={() => navigate("/userinfo")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </Logo>
            </div>
          ) : (
            <div>
              <Logo onClick={() => navigate("/login")}>Login</Logo>
            </div>
          )}
        </Right>
      </Wrapper>
    </>
  );
};

export default Header;
