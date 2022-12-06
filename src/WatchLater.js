import React, { useState, useEffect } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import axios from 'axios';
import ip from './ipaddress';
import './NewContainer.css';
import { useParams } from 'react-router-dom';
export default function WatchLater() {
  const { id } = useParams();
  const [watchLater, setWatchLater] = useState([]);
  const [containtDisplay, SetContaintDisplay] = useState(false);
  useEffect(() => {
    const data = { UserId: id };
    axios
      .get(`http://${ip}:8000/watch`, { params: data })
      .then((response) => {
        console.log('repsonse form ratingins is', response);
        setWatchLater(response.data.msg);
      })
      .catch((error) => {
        console.log('error while fetching ratings', error);
      });
  }, [id]);
  return (
    <div>
      <Navbar1 />
      <Navbar2 />
      <div className="NewContainter">
        <div className=" px-4 row">
          {watchLater &&
            watchLater.length > 0 &&
            watchLater.map((data, index) => {
              return (
                <div className="col-lg-4 mt-4" key={index}>
                  <div className="Card">
                    <img src={data.urlToImage} className="CardImage" alt="" />

                    <div className="CardDetails">
                      <div className="CardHeading">{data.title}</div>
                      <div className="CardSubTitle">{data.description}</div>

                      <p
                        className="CardContaint"
                        style={{ display: containtDisplay ? 'block' : 'none' }}
                      >
                        {data.content}
                      </p>

                      <div className="CardOption">
                        <div className="lastupdate">
                          {/* <div>{data.source.name}</div> */}
                          <div>{new Date(data.publishedAt).toDateString()}</div>
                          <div className="LastUpdate">
                            Last Update -{' '}
                            {msToTime(new Date() - new Date(data.publishedAt))}
                          </div>
                        </div>
                        <div className="CardLink">
                          <div
                            className="SmallButton"
                            onClick={() => SetContaintDisplay(!containtDisplay)}
                          >
                            {containtDisplay ? 'Less' : 'More'}
                          </div>
                          <a className="SmallButton" href={data.url}>
                            Link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {watchLater.length === 0 && (
          <div className="text-center">
            You haven't added any news in watch later.
          </div>
        )}
      </div>
    </div>
  );
}
function msToTime(duration) {
  var seconds = Math.ceil(duration / 1000);
  var minutes = Math.floor(duration / (1000 * 60));
  var hours = Math.floor(duration / (1000 * 60 * 60));
  var days = Math.floor(duration / (1000 * 60 * 60 * 24));

  if (hours === 0) {
    return <div>{minutes} min</div>;
  } else if (days === 0) {
    return <div>{hours} hrs</div>;
  } else {
    return <div>{days} days</div>;
  }
}
