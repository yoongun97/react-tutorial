import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../axios/api";

export default function Detail() {
  // props로 로그인된 유저 정보 currentUser 받아오기
  const navigate = useNavigate();
  const { id } = useParams();
  // useParmas로 url에 넣어준 id를 받아온다.
  const queryClient = new useQueryClient();

  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const { data, isLoading, isError, error } = useQuery("items", async () => {
    const response = await api.get(`/items`, { params: { id } });
    return response.data;
  });
  const [item] = data;

  // 데이터 가져오기
  const user = useSelector((state) => state.User.email);

  // item 삭제 이벤트
  const mutation = useMutation(
    async (author) => {
      if (user === author) {
        if (window.confirm("삭제할까??")) {
          // 데이터베이스에서 삭제
          api.delete(`/items/${id}`);
          navigate("/");
        }
      } else {
        alert("해당 글의 작성자가 아닙니다.");
      }
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
    <>
      <Header />
      <Container key={item?.id}>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {item?.title}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {item?.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              if (user === item?.author) {
                navigate(`/edit/${item.id}`);
              } else {
                alert("해당 글의 작성자가 아닙니다.");
              }
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "orange",
              color: "white",
              cursor: "pointer",
              marginRight: "6px",
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              mutation.mutate(item?.author);
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </Container>
    </>
  );
}
