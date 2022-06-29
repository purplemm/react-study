import { Fragment, useEffect, useState } from "react";
import ShoesCard from "../components/ShoesCard";
import axios from "axios";

function Main(props){
    let [moreBtn, setMoreBtn] = useState(true);
    console.log(props.shoes);
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
            setMoreBtn(false);
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

                {
                    moreBtn
                    ? <button onClick={ moreList }>더보기</button>
                    : null
                }
            </div> 
        </Fragment>  
    )
}

export default Main;