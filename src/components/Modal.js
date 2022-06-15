function Modal(props){
    return (
        <div className="modal" style={{ background: props.bgColor }}>
            <h4>{ props.title[props.index] }</h4>
            <p>날짜</p>
            <p>상세내용</p>
            <button onClick={ props.postModify }>글수정</button>
        </div>
    )
}

export default Modal;