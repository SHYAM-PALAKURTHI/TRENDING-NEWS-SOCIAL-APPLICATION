import { faLess } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import "./card.css";
import logo from "./Image/logo.png";

function Card(item) {

    const data = item.data;
    const [containtDisplay, SetContaintDisplay] = useState(false);


    return (
        <div className="Card">
            <img src={data.urlToImage} className="CardImage" />

            <div className="CardDetails">
                <div className="CardHeading">{data.title}</div>
                <div className="CardSubTitle">{data.description}</div>

                <p className="CardContaint"  style={{display: containtDisplay ? "block" : "none"}}>{data.content}</p>

                <div className="CardOption">
                    <div className="lastupdate">
                        <div>{data.source.name}</div>
                        <div>{new Date(data.publishedAt).toDateString()}</div>
                        <div className="LastUpdate">Last Update - {msToTime(new Date()-new Date(data.publishedAt))}</div>


                    </div>
                    <div className="CardLink">
                        <div className="SmallButton" onClick={()=>SetContaintDisplay(!containtDisplay)}>{containtDisplay ? "Less" : "More"}</div>
                        <a className="SmallButton"  href={data.url}>Link</a>
                    </div>
                </div>
            </div>

        </div>
    )

}


function msToTime(duration) {
    var seconds = Math.ceil((duration / 1000));
    var minutes = Math.floor((duration / (1000 * 60) ));
    var hours = Math.floor((duration / (1000 * 60 * 60)));
    var days = Math.floor((duration / (1000 * 60 * 60 * 24)));


    if(hours==0)
    {
        return(<div>{minutes} min</div>)
    }
    else if(days==0)
    {
        return(<div>{hours} hrs</div>)

    }
    else
    {
        return(<div>{days} days</div>)
    }
  
  }
export default Card;