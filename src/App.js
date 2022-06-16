import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import './App.css';
import shoesList from "./data/shoesList";
import Main from "./pages/Main";
import Detail from "./pages/Detail";

function App() {
  let [shoes, setShoes] = useState(shoesList);
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
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ <Main shoes={ shoes } /> } />
        {/* ':XX' : ':'뒤는 파라미터 */}
        <Route path="/detail/:id" element={ <Detail shoes={ shoes } /> } />

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
