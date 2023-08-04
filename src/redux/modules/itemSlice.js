import { createSlice } from "@reduxjs/toolkit";
// import produce from "immer";

// 1. createSlice 만들기
const items = createSlice({
  name: "Items",
  initialState: [],
  // 3. reducers 추가
  reducers: {
    // 4. reducer 안에 변경함수 만들기
    addItem: (state, action) => {
      // action.payload = {title, content}
      return [...state, action.payload];
      //immer, state.push
      //   return produce(state, (draft) => {
      //     draft.initialItems.push(newItem);
      //   });
    },

    deleteItem: (state, action) => {
      // action.payload = id
      const newItems = state.filter((item) => item.id !== action.payload);
      return newItems;
    },

    editItem: (state, action) => {
      return action.payload;
    },
  },
});

export const { setItem, addItem, deleteItem, editItem } = items.actions;
export default items.reducer;
