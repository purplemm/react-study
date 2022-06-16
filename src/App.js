import { createContext, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import './App.css';
import shoesList from "./data/shoesList";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";

// [Context API]
// - state 변경 시 쓸데없는 것까지 재렌더링되어 비효율적, 성능이슈
// - 컴포넌트 재사용이 어려울 수 있음
// 위의 이유로 인해 외부 라이브러리를 많이 사용함 (리덕스)
export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(shoesList);
  let [shoesNum, setShoesNum] = useState([10, 11, 12]);
  // navigate : 페이지 이동 도와주는 함수
  // navigate(-1 또는 1) 이전, 이후 페이지 이동
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/detail">Detail</Link>
            <Link to="/event">Event</Link>
            <Link to="/cart">Cart</Link>
          </Nav>
        </Container>
      </Navbar>

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
