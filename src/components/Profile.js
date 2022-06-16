import React, { Component } from "react";

// [react 옛날 문법]

// class : 데이터/함수를 보관하는 덩어리, class는 여러개의 데이터나 함수를 한 곳에 보관하고 싶을 때 쓰는 문법
// extends : 덩어리를 만들 때 오른쪽에 있는 놈 성질을 물려받아서 덩어리를 만들겠다는 소리
// React.Component : 컴포넌트 성질을 갖고있는 덩어리

// class를 만들어두시면 class가 가지고 있는 데이터를 그대로 복사해서 사용할 수 있는 object를 쉽게 만들 수 있습니다.
// 혹은 class가 가지고 있는 데이터를 그대로 복사해서 사용할 수 있는 class도 쉽게 만들 수도 있고요. (extends 문법을 씁니다)
// 암튼 가끔 그러고 싶을 때가 있어서 쓰는 문법인데 리액트는 왜 저러냐면 

// 1. 리액트 만든 사람들이 컴포넌트와 관련된 데이터/함수들을 보관하기 위해서 React.Component라는 class를 만들어두었고
// 2. 그걸 extends 를 이용해서 복사하면 여러분만의 컴포넌트를 만들 수 있는거고
// 3. 그리고 그렇게 하시면 여러분 컴포넌트는 리액트관련 데이터/함수를 자유롭게 쓸 수 있는겁니다. 
class Profile extends React.Component {
    // 예전엔 constructor(){} 안에 모든 state를 보관했었습니다.
    // 1. state저장할 땐 constructor() 안에 this.state 라는 변수에 전부 보관하셔야합니다.
    // 2. 그리고 꺼내쓸 때는 this.state.state명 이렇게 쓰시면 됩니다.
    // super()는 "extends 했던 React.Component 라는 덩어리에 있던 변수들을 그대로 물려받아 쓰겠습니다~" 라는 뜻이고 꼭 먼저 써주셔야 super() 밑에서 state를 만들 수 있습니다.
    constructor(){
        super();
        this.state = { name : "Kim", age : 30 }
    }

    // this가 재정의되지않게
    // 1. 함수를 쓸 때 this.changeName.bind(this) 이렇게 사용하시거나
    // 2. 함수를 아예 arrow function으로 바꿔주시면 됩니다.
    changeName = () => {
        this.setState({ name : "Park" });
    }

    render(){
        return (
            <div>
                <h3>저는 { this.state.name } 입니다.</h3>
                <button onClick={ this.changeName }>이름수정</button>
            </div>
        )
    }
}

export default Profile;


// [arrow function 과 this 키워드의 관계]
 
// 자바스크립트에선 () => {} (arrow function) 과 그냥 function(){} 은 거의 같은 의미입니다.
// 하지만 한가지 차이점이 있는데

// arrow function을 쓰시면 안에 있는 this값을 재정의해주지않습니다. 바깥에 있던 this의 값을 그대로 끌고와서 사용합니다.
// 하지만 function(){}을 쓰시면 this값이 새롭게 변화합니다.

// 같은 함수문법이지만 이런 차이가 있습니다.
// 그래서 arrow function은 내부의 this키워드 값을 변화시키지 않고 싶을 때 사용합니다.