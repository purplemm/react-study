import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props){
    console.log(props.shoes);
    let {id} = useParams();
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [inputVal, setInputVal] = useState("");

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

    return (
        <div className="container">
            {
                alert
                ? <div className="alert alert-warning">2초 후에 사라집니다.</div>
                : null
            }
            
            <button onClick={() =>{ setCount(1) }}>{count}</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + `./assets/images/shoes${id}.jpg`} width="100%" />
                </div>

                <input onChange={(e) => { setInputVal(e.target.value) }} />

                <div className="col-md-4">
                    <h5 className="pt-5">{ props.shoes[id].title }</h5>
                    <p>{ props.shoes[id].content }</p>
                    <h6>{ props.shoes[id].price }</h6>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>    
    )
}

export default Detail;