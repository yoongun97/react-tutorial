import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Edit() {
  const { id } = useParams();
  // useParmas로 url에 넣어준 id를 받아온다.
  const queryClient = new useQueryClient();

  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const { data, isLoading, isError, error } = useQuery("items", async () => {
    const response = await api.get("/items");
    return response.data;
  });

  // props 로 넘겨받은 contents 배열에서
  // find 메서드를 사용하여 id값과 일치하는 요소만 가져온다.
  const item = data.find((item) => {
    return item.id === id;
  });

  // title, content 수정을 위해 useState 선언
  // or연산자를 활용해 undefined 일때는 빈 문자열을 초기값으로
  let initTitle = item?.title || "";
  let initContent = item?.content || "";
  const [title, setTitle] = useState(initTitle);
  const [content, setContent] = useState(initContent);
  const navigate = useNavigate();

  // input title, content 수정사항 반영하기
  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const mutation = useMutation(
    async () => {
      const editedItems = data.map((item) =>
        item.id === id
          ? {
              ...item,
              title,
              content,
            }
          : item
      );
      const editedItem = editedItems.find((item) => item.id === id);
      api.patch(`/items/${id}`, editedItem);
      navigate("/");
    },
    // 데이터 추가 후 화면 바로 변경
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
      },
    }
  );

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Fragment>
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
            mutation.mutate();
          }}
        >
          <div>
            <input
              type="text"
              // defaultValue={title}
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
              type="text"
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
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
