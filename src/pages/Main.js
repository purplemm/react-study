import { Fragment, useEffect, useState } from "react";
import ShoesCard from "../components/ShoesCard";
import axios from "axios";

function Main(props){
    console.log(props.setShoes());
    // ajax 방법 3가지
    // 1. XMLHttpRequest
    // 2. fetch() : json 형식으로 바꿔줘야하는 과정이 있다.
    // 3. axios : 라이브러리 자체에서 json으로 변환해준다.
    function moreList(){
        axios.get("https://codingapple1.github.io/shop/data2.json")
        // then은 성공일 경우
        .then((result) => { 
            let newData = [...props.shoes, ...result.data];
            props.setShoes(newData);

            // 이곳에서 state 안쓰려고 props로 작업하려다가 에러났고 여기까지 하고 퇴근한다
        })    
        // catch는 실패일 경우
        .catch(() => { console.log("실패") });              
    }

    return (
        <Fragment>
            <div className="main-bg"></div>
            <div className="container">
                <div className="row">
                    {
                        props.shoes.map(function(a, i){
                            return (
                                <ShoesCard key={ i } idex={ i } shoes={ props.shoes[i] } />
                            )
                        })
                    }
                </div>

                <button onClick={() => { moreList() }}>더보기</button>
            </div> 
        </Fragment>  
    )
}

export default Main;