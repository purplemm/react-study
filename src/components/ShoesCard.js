import { Link } from "react-router-dom";

function ShoesCard(props){
    return (
        <div className="col-md-4">
            <Link to={`/detail/${props?.shoes.id}`}>
                {/* {process.env.PUBLIC_URL + '이미지경로'} 는 이미지 파일을 일일히 import 하지 않아도 됨 */}
                <img src={process.env.PUBLIC_URL + `./assets/images/shoes${props.shoes.id}.jpg`} width="80%" />
                <h4>{ props.shoes.title }</h4>
                <p>{ props.shoes.content }</p>
                <h6>{ props.shoes.price }</h6>
            </Link>
        </div>
    )
}

export default ShoesCard;