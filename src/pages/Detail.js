import { useParams } from "react-router-dom";

function Detail(props){
    let {id} = useParams();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + `./assets/images/shoes${id}.jpg`} width="100%" />
                </div>

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