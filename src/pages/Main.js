import { Fragment } from "react";
import ShoesCard from "../components/ShoesCard";

function Main(props){
    // console.log(props.shoes);
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
            </div> 
        </Fragment>  
    )
}

export default Main;