import { memo, Fragment, useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addCount } from "../store/store";
import { changeName, addAge } from "../store/userSlice";

// memo : 꼭 필요할 때만 렌더링 하고 싶은 컴포넌트 감싸기 (props가 변경될 때)
let Child = memo(function(){
    console.log("자식컴포넌트짠")
    return <div>자식임</div>
});

// useMemo 테스트를 위한 함수
// function forFunc(){
//     return 
// }

function Cart(){
    // useMemo : 꼭 필요할 때만 함수를 실행하고 싶을 때
    // let forFunc = forFunc();
    // useMemo(() => {return forFunc()}, [state]);

    // memo 테스트를 위한 state
    let [count, SetCount] = useState(0);

    // useSelector : store에 저장한 state 불러오는 법, 그냥 정해져 있으니 복붙해서 쓰자
    let state = useSelector((state) => state);
    
    // useDispatch : store.js로 요청을 보내주는 함수
    let dispatch = useDispatch();
    let [order, setOrder] = useState(state.orderList);

    useEffect(() => {
        setOrder(state.orderList);
    }, [order]);

    console.log(state);

    return (
        <Fragment>
            <Child count={ count } />
            <button type="button" onClick={() => { SetCount(count + 1) }}>button</button>

            <h1>{state.user.name} / {state.user.age} 의 장바구니</h1>

            <button onClick={() => { dispatch(addAge(100)) }}>나이증가</button>

            <Table summary="#, 상품명, 수량, 변경하기로 구성">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">상품명</th>
                        <th scope="col">수량</th>
                        <th scope="col">변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.orderList.map(function(a, i){
                            return (
                                <tr key={i}>
                                    <td scope="row">{state.orderList[i].id}</td>
                                    <td>{state.orderList[i].name}</td>
                                    <td>{state.orderList[i].count}</td>
                                    <td><button onClick={() => { dispatch(addCount(state.orderList[i].id)) }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Fragment>    
    )
}

export default Cart;