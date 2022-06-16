import { createSlice } from "@reduxjs/toolkit";

// slice 하나가 state 하나
let user = createSlice({
    name: "user",
    initialState: { name: "Boramm", age: 31 },
    // reducers : state 수정해주는 함수 넣는 곳
    reducers: {
        // state : 기존 initialState
        // state가 object 또는 array면 return 없이 직접 수정 가능
        changeName(state){
            state.name = "No";
        },
        addAge(state, a){
            // 파라미터 뒤에는 .payload 붙여줘야함
            state.age += a.payload;
        }
    }
});

// state 변경 함수를 action이라고 함
export let { changeName, addAge } = user.actions;

export default user;