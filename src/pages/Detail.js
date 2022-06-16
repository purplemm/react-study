import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../store/store";

import { Context1 } from "../App";

function Detail(props){
    console.log(props.shoes);

    let dispatch = useDispatch();

    let {id} = useParams();
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [inputVal, setInputVal] = useState("");
    let [tab, setTab] = useState(0);
    let [fade, setFade] = useState("");

    let {shoesNum} = useContext(Context1);

    // [useEffect] 
    // - mount, update 시 코드 실행
    // - html 렌더링 후에 동작하기 때문에 어려운 연산이나 서버에서 데이터 가져올 때, 타이머 장착 등의 경우에 사용
    // - Side Effect 보관함 같은 역할 : 함수의 핵심기능과 상관없는 부가기능
    // - [state명] 기재 시 특정 state 변경 시에만 실행, 비어있을 경우 mount시에만 실행, []를 아예 안쓸경우는 재렌더링마다 실행
    useEffect(() => {
        // console.log("안녕");
        let hideAlert = setTimeout(() => {setAlert(false)}, 2000);

        if(isNaN(inputVal)){
            // console.log("숫자만 입력하세요.");
        }

        // return 함수는 useEffect 동작 전에 실행 (unmount시에 실행)
        // ex) 서버로 데이터 요청하는 코드 실행 시 기존 데이터 요청을 제거하는 함수를 넣을 수 있다.
        return () => {
            // console.log("안녕취소");
            clearTimeout(hideAlert)
        }
    }, [inputVal]);

    useEffect(() => {
        setTimeout(() => {setFade("end")}, 100);
        return () => {setFade("")}
    }, []);

    return (
        <div className={`container start ${fade}`}>
            {
                alert
                ? <div className="alert alert-warning">2초 후에 사라집니다.</div>
                : null
            }
            
            <button onClick={() =>{ setCount(1) }}>{count}</button>

            <div>{shoesNum}</div>

            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + `./assets/images/shoes${id}.jpg`} width="100%" />
                </div>

                <input onChange={(e) => { setInputVal(e.target.value) }} />

                <div className="col-md-4">
                    <h5 className="pt-5">{ props.shoes[id].title }</h5>
                    <p>{ props.shoes[id].content }</p>
                    <h6>{ props.shoes[id].price }</h6>
                    <button className="btn btn-danger" onClick={() => { dispatch(addItem(props.shoes[id])) }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={ tab } fade={ fade } setFade={ setFade } />
        </div>    
    )
}

// props 귀찮으면 {중괄호 안에 바로 전달할 props 넣으면 됨}
function TabContent({tab, fade, setFade}){
    let {shoesNum} = useContext(Context1);

    useEffect(() => {
        // 리액트 18버전부터 automatic batch 기능 추가됨
        // state 변경함수들이 연달아서 여러개 처리되어야한다면 
        // state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됩니다. 
        // 그래서 'end' 로 변경하는거랑 ' ' 이걸로 변경하는거랑 약간 시간차를 뒀습니다.
        // 찾아보면 setTimeout 말고 flushSync() 이런거 써도 될 것 같기도 합니다. automatic batching을 막아줍니다.
        setTimeout(() => {setFade("end")}, 100);
        return () => {setFade("")}
    }, [tab]);

    // if(tab === 0){
    //     return <div>내용0</div>;
    // }else if(tab === 1){
    //     return <div>내용1</div>;
    // }else if(tab === 2){
    //     return <div>내용2</div>;
    // }

    // 아래처럼 구현할 수도 있다...!
    return (
        <div className={`start ${fade}`}>
            {[<div>{shoesNum}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>
    )
}

export default Detail;