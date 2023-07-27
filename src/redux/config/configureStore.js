import { configureStore, createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

// 데이터 중앙 저장소 만들기
const store = configureStore({
  reducer: {
    // 2. 다른 곳에서 사용할 수 있게 configureStore에 넣어주기
    Items: items.reducer,
  },
});

// useState의 초기값 정의
const initialItems = [
  {
    id: uuid(),
    title: "제목1",
    content: "내용1입니다.",
    author: "작성자1",
  },
  {
    id: uuid(),
    title: "제목2",
    content: "내용2입니다.",
    author: "작성자2",
  },
  {
    id: uuid(),
    title: "제목3",
    content: "내용3입니다.",
    author: "작성자3",
  },
];

// 1. createSlice 만들기
let items = createSlice({
  name: "Items",
  initialState: initialItems,
});

export default store;