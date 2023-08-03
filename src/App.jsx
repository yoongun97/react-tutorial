import { Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/modules/userSlice";
import { setItem } from "./redux/modules/itemSlice";
import axios from "axios";
import { useQuery } from "react-query";

function App() {
  const dispatch = useDispatch();

  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const fetchItems = useQuery("items", async () => {
    const { data } = await axios.get("http://localhost:4000/items");
    // 데이터를 받아오고 받아온 데이터를 items에 넣어준다.
    dispatch(setItem(data));
  });

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    // 사용자의 로그인 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // redux-toolkit이나 props로 내려주는 것이 좋은 방법
      if (user) {
        try {
          dispatch(setUser({ email: user.email }));
        } catch (error) {
          console.log("사용자 정보를 가져오는 데 실패했습니다.\n", error);
        }
      } else {
        dispatch(setUser({ email: null }));
        // 로그인되지 않은 상태면 null로 설정
      }
    });
    return () => unsubscribe(); // 컴포넌트 언마운트 시 이벤트 구독 해제
  }, []);

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      {/* props로 items 내려보내주기 */}
      <Route path="/" element={<Main />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <>
            <div>없는 페이지입니다.</div>
            <Link to="/">홈으로 이동</Link>
          </>
        }
      />
    </Routes>
  );
}

export default App;
