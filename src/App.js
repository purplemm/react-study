import { useState } from "react";
import './App.css';
import Modal from "./components/Modal";

function App() {
  let titleList = ["이것은", "글제목", "리스트"];

  let [title, setTitle] = useState(titleList);
  let [like, setLike] = useState([0, 0, 0]);
  let [showModal, setShowModal] = useState(false);
  let [index, setIndex] = useState(0);
  let [inputVal, setInputVal] = useState("");

  function handleModal(){
    setShowModal(!showModal);
  }

  function addLike(e, i){
    e.stopPropagation();
    let copyLike = [...like];
    copyLike[i]++;
    setLike(copyLike);
  }

  function postModify(){
    let copyTitlelist = [...titleList];
    copyTitlelist[0] = "수정한글제목";
    setTitle(copyTitlelist);
  }

  function onChange(value){
    setInputVal(value);

    console.log(value);
  }

  function addPost(){
    let copyTitlelist = [...titleList];
    copyTitlelist.push(inputVal);
    setTitle(copyTitlelist);

    console.log(titleList);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h1>Blog</h1>
      </div>

      {
        titleList.map(function(title, i){
          return (
            <div className="list" key={i}>
              <h3 onClick={() => { handleModal(); setIndex(i) }}>{ titleList[i] }</h3>
              <div onClick={(e) => { addLike(e, i) }}>❤ <span>{ like[i] }</span></div>
              <p>6월 15일</p>
            </div>
          )
        })
      }

      <input type="text" onChange={(e) => { onChange(e.target.value) }} />
      <button onClick={ addPost }>추가</button>
 
      { showModal ? <Modal index={ index } title={ title } bgColor={ "orange" } postModify={ postModify } /> : null }
    </div>
  );
}

export default App;
