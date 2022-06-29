// lazy : import한 components가 필요할때만 렌더링되도록 함 
// Suspense : lazy함수로 렌더한 컴포넌트는 로딩시간이 길어져 하얀화면만 나올 수 있는데 이때 로딩 UI를 대신 보여줄 수 있음
import { lazy, Suspense, createContext, useEffect, useState, useTransition, useDeferredValue } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import './App.css';
import shoesList from "./data/shoesList";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
// import Cart from "./pages/Cart";
import axios from "axios";
import { useQuery } from "react-query";
const Cart = lazy(() => import("./pages/Cart.js"));

// [Context API]
// - state 변경 시 쓸데없는 것까지 재렌더링되어 비효율적, 성능이슈
// - 컴포넌트 재사용이 어려울 수 있음
// 위의 이유로 인해 외부 라이브러리를 많이 사용함 (리덕스)
export let Context1 = createContext();

// 아래 성능개선을 위한 hook 테스트용
let arry = new Array(10000).fill(0);

function App() {
  let [shoes, setShoes] = useState(shoesList);
  let [shoesNum, setShoesNum] = useState([10, 11, 12]);
  // navigate : 페이지 이동 도와주는 함수
  // navigate(-1 또는 1) 이전, 이후 페이지 이동
  let navigate = useNavigate();

  useEffect(() => {
    let watchedList = localStorage.getItem("watched");
    if(!watchedList){
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  // react-qeury를 이용한 ajax 요청
  // [장점]
  // 1. 성공 / 실패 / 로딩중 파악가능 ( result.data / result.error / result.isLoading )
  // 2. 수시로 refatch 해주어 실시간으로 변하는 데이터를 보여주기 좋음
  // 3. staleTime으로 refatch 시간 설정 가능
  let result = useQuery("user", () => {
    return axios.get("https://codingapple1.github.io/userdata.json")
    .then((res) => { return res.data })
  }, { staleTime : 2000 });


  // 성능개선을 위한 useTransition, useDeferredValue
  let [name, setName] = useState("");
  // isPending : startTransition이 처리중일 때 true로 변함
  // useTransition : 함수 안에 있는 함수는 늦게 처리 해주어 성능개선
  let [isPending, startTransition] = useTransition();
  // useDeferredValue(state) : state에 변동사항이 생기면 그걸 늦게 처리 해주어 성능개선
  let nameState = useDeferredValue(name);

  return (
    <div className="App">
      <input type="text" onChange={(e) => { startTransition(() => { setName(e.target.value) }) }} />
      {
        isPending
        ? <div>로딩중</div>
        : arry.map((a, i) => { return <div key={i}>{ nameState }</div> })
      }
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/detail">Detail</Link>
            <Link to="/event">Event</Link>
            <Link to="/cart">Cart</Link>
          </Nav>
          <Nav className="ms-auto" style={{ color: "#fff" }}>반가워요 { result.isLoading ? "Loading..." : result.data.name }</Nav>
        </Container>
      </Navbar>

      {/* Routes를 통으로 감싸도 되고, lazy 함수로 import한 Route 하나만 감싸도 된다. fallback 값으로 로딩 컴포넌트 추가 */}
      <Suspense fallback={ <div>로딩중</div> }>
        <Routes>
          <Route path="/" element={ <Main shoes={ shoes } setShoes={ setShoes } /> } />
          {/* ':XX' : ':'뒤는 파라미터 */}
          <Route path="/detail/:id" element={ 
            <Context1.Provider value={{ shoesNum }}>
              <Detail shoes={ shoes } /> 
            </Context1.Provider>
          } />
          <Route path="/cart" element={ <Cart /> } />

          {/* nested routes 방법 */}
          <Route path="/event" element={ <Event /> }>
            <Route path="one" element={ <p>첫번째 이벤트</p> } />
            <Route path="two" element={ <p>두번째 이벤트</p> } />
          </Route>

          {/* 정의된 path외의 경로로 접속하면 보여질 element 지정 가능 */}
          <Route path="*" element={ <p>404 페이지</p>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Event(){
  return (
    <div>
      <h1>오늘의 이벤트</h1>
      <Outlet />
    </div>
  )
}

export default App;
