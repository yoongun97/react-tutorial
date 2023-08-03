import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/modules/itemSlice";
import axios from "axios";
import uuid from "react-uuid";

export default function Create() {
  // title, content 수정을 위해 useState 선언
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.User.email);

  // input title, content 수정사항 반영하기
  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const itemAddHandler = async () => {
    const newItem = {
      id: uuid(),
      title: title,
      content: content,
      author: user,
    };
    // 새로운 item을 데이터베이스에 추가
    await axios.post("http://localhost:4000/items", newItem);
    // items에도 추가
    dispatch(addItem(newItem));
    navigate("/");
  };

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            itemAddHandler();
          }}
        >
          <div>
            <input
              placeholder="제목"
              type="text"
              value={title}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
              // onchange로 input 값 상태 변경 감지
              onChange={(e) => {
                titleChangeHandler(e);
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              placeholder="내용"
              value={content}
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
              // onchange로 input 값 상태 변경 감지
              onChange={(e) => {
                contentChangeHandler(e);
              }}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
