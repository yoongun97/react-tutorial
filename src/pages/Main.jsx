import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import api from "../axios/api";

export default function Main() {
  const navigate = useNavigate();
  const queryClient = new useQueryClient();

  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const { data, isLoading, isError, error } = useQuery("items", async () => {
    const response = await api.get("/items");
    return response.data;
  });

  // 데이터 가져오기
  const user = useSelector((state) => state.User.email);

  // item 삭제 이벤트
  const mutation = useMutation(
    async (data) => {
      const { id, author } = data;
      if (user !== author) {
        alert("해당 글의 작성자가 아닙니다.");
      } else if (window.confirm("삭제할까??")) {
        // 데이터베이스에서 삭제
        api.delete(`/items/${id}`);
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
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={() => {
              // 추가버튼 클릭 시 로그인 여부 확인
              if (user) {
                navigate("/create");
              } else {
                alert("로그인이 필요합니다.");
              }
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {/* 
        userState로 정의한 list 배열을 map함수로 펼쳐준다.
        list 배열의 요소(객체)의 데이터를 보여주고, 배열 내의 모든 요소에 해당 과정을 반복한다. 
        */}
        {data.map((item) => (
          <div
            // map 내부에 고유의 key값 부여
            key={item.id}
            style={{
              backgroundColor: "#EEEEEE",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
            }}
          >
            <div
              onClick={() => {
                navigate(`/detail/${item.id}`);
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
                cursor: "pointer",
              }}
            >
              <h2>{item.title}</h2>
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>{item.author}</div>
              <div>
                <button
                  onClick={() => {
                    if (user === item.author) {
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
                    // 삭제할 item을 특정하기 위해 해당 버튼이 있는 item의 id를 보내준다.
                    mutation.mutate({ id: item.id, author: item.author });
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
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
