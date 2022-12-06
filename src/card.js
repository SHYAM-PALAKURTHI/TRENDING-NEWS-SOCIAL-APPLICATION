import React, { useEffect, useState } from 'react';
import './card.css';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import ip from './ipaddress';

function Card(item) {
  const data = item.data;
  const [containtDisplay, SetContaintDisplay] = useState(false);
  const [rating, setRating] = useState(0);
  const [userDetail, setUserDetail] = useState(null);
  const UserId = localStorage.getItem('UserId');

  const handleRating = (rate) => {
    setRating(rate);
    item.saveRating(rate, data);
  };
  const handleWatchLater = () => {
    item.saveWatchLater(data);
  };
  const shareOnWhatsapp = () => {
    let url = `https://web.whatsapp.com/send?phone=+91${item.userDetail.number}`;

    // Appending the message to the URL by encoding it
    url += `&text=${encodeURI(data.url)}&app_absent=0`;

    // Open our newly created URL in a new tab to send the message
    window.open(url);
  };

  return (
    <div className="Card">
      <img src={data.urlToImage} className="CardImage" alt="card_image" />

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
            <div>{data.source.name}</div>
            <div>{new Date(data.publishedAt).toDateString()}</div>
            <div className="LastUpdate">
              Last Update - {msToTime(new Date() - new Date(data.publishedAt))}
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
        <div className="CardOption">
          <Rating onClick={handleRating} size={20} />
          <div className="CardLink" style={{ cursor: 'pointer' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={handleWatchLater}
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7z" />
            </svg>
          </div>
        </div>
        <svg
          style={{ cursor: 'pointer' }}
          className="mt-2"
          onClick={shareOnWhatsapp}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          class="bi bi-whatsapp"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
      </div>
    </div>
  );
}

function msToTime(duration) {
  var seconds = Math.ceil(duration / 1000);
  var minutes = Math.floor(duration / (1000 * 60));
  var hours = Math.floor(duration / (1000 * 60 * 60));
  var days = Math.floor(duration / (1000 * 60 * 60 * 24));

  if (hours == 0) {
    return <div>{minutes} min</div>;
  } else if (days == 0) {
    return <div>{hours} hrs</div>;
  } else {
    return <div>{days} days</div>;
  }
}
export default Card;
