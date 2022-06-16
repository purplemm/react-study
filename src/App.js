import { useState } from "react";
import './App.css';
import Modal from "./components/Modal";
import Profile from "./components/Profile";

function App() {
  let [title, setTitle] = useState(["이것은", "글제목", "리스트"]);
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

  function modifyPost(){
    let copyTitle = [...title];
    copyTitle[0] = "수정한글제목";
    setTitle(copyTitle);
  }

  function deletePost(i){
    let copyTitle = [...title];
    copyTitle.splice(i, 1);
    setTitle(copyTitle);

    console.log(i, copyTitle);
  }

  function onChange(value){
    setInputVal(value);

    console.log(value);
  }

  function addPost(){
    let copyTitle = [...title];
    copyTitle.unshift(inputVal);
    setTitle(copyTitle);

    console.log(copyTitle);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h1>Blog</h1>
      </div>

      {
        title.map(function(a, i){
          return (
            <div className="list" key={i}>
              <h3 onClick={() => { handleModal(); setIndex(i) }}>{ title[i] }</h3>
              <div onClick={(e) => { addLike(e, i) }}>❤ <span>{ like[i] }</span></div>
              <p>6월 15일</p>
              <button onClick={() => { deletePost(i) }}>삭제</button>
            </div>
          )
        })
      }

      <input type="text" onChange={(e) => { onChange(e.target.value) }} />
      <button onClick={ addPost }>추가</button>

      <Profile />
 
      { showModal ? <Modal index={ index } title={ title } bgColor={ "orange" } modifyPost={ modifyPost } /> : null }
    </div>
  );
}

export default App;
