import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./userSlice";

// slice 하나가 state 하나
let stock = createSlice({
    name: "stock",
    initialState: [10, 11, 12]
});

let orderList = createSlice({
    name: "orderList",
    initialState: [
        {id: 0, name: 'White and Black', count: 2},
        {id: 2, name: 'Grey Yordan', count: 1}
    ],
    reducers: {
        addCount(state, id){
            let selectIndex = state.findIndex((a) => a.id === id.payload);
            state[selectIndex].count++;
        },
        addItem(state, item){
            state.push(item.payload);
        }
    } 
});

// state 변경 함수를 action이라고 함
export let { addCount, addItem } = orderList.actions;

// configureStore : 위에서 정의한 slice를 등록
export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        orderList: orderList.reducer
    }
});

// [Redux]
// - 컴포넌트 간 state 공유 편해짐 (props 사용 안해도 됨)
