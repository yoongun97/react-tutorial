import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/modules/userSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User.email);

  // 로그아웃 함수
  const logout = async () => {
    alert("로그아웃 할까?");
    await signOut(auth);
    dispatch(setUser({ email: null }));
  };

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        style={{
          color: "gray",
          cursor: "pointer",
        }}
        // 홈 버튼 클릭시 메인화면으로 이동
        onClick={() => {
          navigate("/");
        }}
      >
        <FaHome />
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {/* 로그인 된 유저가 있을 시 로그아웃, 이메일 버튼 보여주기 */}
        {user ? (
          <>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
              }}
              onClick={logout}
            >
              로그아웃
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              {user}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}
