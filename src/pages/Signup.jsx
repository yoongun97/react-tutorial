import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SIGNUP_ERROR_CODES } from "../lib/firebase/error";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validpassword, setValidPassword] = useState("");

  // 입력값 받기
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const validPasswordChangeHandler = (e) => {
    setValidPassword(e.target.value);
  };

  // 회원가입 함수
  const signup = async (event) => {
    event.preventDefault();
    // 유효성 검사
    if (email === "") {
      alert("이메일을 입력해주세요");
    } else if (password === "" || validpassword === "") {
      alert("비밀번호를 입력해주세요");
    } else if (password !== validpassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      try {
        // 회원가입
        await createUserWithEmailAndPassword(auth, email, password);
        alert("가입되었습니다");
        navigate("/");
      } catch (error) {
        if (SIGNUP_ERROR_CODES[error.code]) {
          return alert(SIGNUP_ERROR_CODES[error.code]);
        } else {
          return alert("알 수 없는 에러입니다. 나중에 다시 시도해보세요.");
        }
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="이메일"
                value={email}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => {
                  emailChangeHandler(e);
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호"
                value={password}
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => {
                  passwordChangeHandler(e);
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호 확인"
                type="password"
                value={validpassword}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
                onChange={(e) => {
                  validPasswordChangeHandler(e);
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={signup}
              >
                회원가입하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
