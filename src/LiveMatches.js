import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';

const LiveMatches = () => {
  const [matchesData, setMatchesData] = useState({
    cricket: [
      {
        title: 'INDIA vs BANGLADESH',
        date: '07/12/22',
        link: 'https://www.google.com/search?q=india+vs+bangladesh&oq=INDIA+vs+B&aqs=chrome.1.69i57j0i131i433i512l3j0i131i433j0i131i433i512l3j0i131i433l2.2338j0j7&sourceid=chrome&ie=UTF-8#sie=m;/g/11jylq_5vv;5;/m/021q23;dt;fp;1;;;',
      },
      {
        title: 'ENGLAND vs PAKISTAN',
        date: '09/12/22-13/12/22',
        link: 'https://www.google.com/search?q=england+vs+pakistan&oq=england+vs+pakistan&aqs=chrome.0.69i59j0i131i433i512l2j0i3j0i131i433i512j0i131i433j0i3j0i131i433i512j0i433i512j0i131i433i512.1307j0j7&sourceid=chrome&ie=UTF-8#sie=m;/g/11t8d_6shf;5;/m/021q23;dt;fp;1;;;',
      },
      {
        title: 'AUSTRALIA vs WEST INDIES',
        date: '08/12/22-12/12/22',
        link: 'https://www.google.com/search?q=west+indies+vs+australia+schedule&sxsrf=ALiCzsZTIRtukE6CKkF3AO_68tuLw5VtnQ%3A1670093298743&ei=8pmLY8j8LKPdz7sPjcSYwAE&ved=0ahUKEwjIvcCujt77AhWj7nMBHQ0iBhgQ4dUDCA8&uact=5&oq=west+indies+vs+australia+schedule&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIFCAAQhgMyBQgAEIYDOgoIABBHENYEELADOgcIABCwAxBDOgQIIxAnOgoIABCxAxCDARBDOggIABCxAxCDAToLCAAQgAQQsQMQgwE6CggAEIAEEIcCEBQ6BwgAEIAEEA06CAgAEAgQHhANSgQIQRgASgQIRhgAUKMEWKARYOMSaAJwAXgAgAHDAYgBjAySAQMwLjmYAQCgAQHIAQrAAQE&sclient=gws-wiz-serp#sie=m;/g/11t85ky5b8;5;/m/021q23;dt;fp;1;;;',
      },
    ],
    football: [
      {
        title: 'Portugal vs Switzerland',
        date: '07/12/22',
        link: 'https://www.google.com/search?q=fifa+world+cup+list&oq=fifa+world+cup+list&aqs=chrome..69i57j0i131i433i512j0i20i131i263i433i512j0i512l5j0i131i433i512j0i512.5920j1j7&sourceid=chrome&ie=UTF-8#sie=m;/g/11jlxsnd6z;2;/m/030q7;dt;fp;1;;;',
      },
      {
        title: 'Morocco vs Spain',
        date: '06/12/22',
        link: 'https://www.google.com/search?q=fifa+world+cup+list&oq=fifa+world+cup+list&aqs=chrome..69i57j0i131i433i512j0i20i131i263i433i512j0i512l5j0i131i433i512j0i512.5920j1j7&sourceid=chrome&ie=UTF-8#sie=m;/g/11jk1_h654;2;/m/030q7;dt;fp;1;;;',
      },
      {
        title: 'Brazil vs South Korea',
        date: '06/12/22',
        link: 'https://www.google.com/search?q=fifa+world+cup+list&oq=fifa+world+cup+list&aqs=chrome..69i57j0i131i433i512j0i20i131i263i433i512j0i512l5j0i131i433i512j0i512.5920j1j7&sourceid=chrome&ie=UTF-8#sie=m;/g/11jlxt6219;2;/m/030q7;dt;fp;1;;;',
      },
    ],
  });

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div style={{ marginTop: '140px' }}>
        <h3 className="text-center m-3">Cricket</h3>
        <div className="d-flex justify-content-between align-items-center container-fluid">
          {matchesData &&
            matchesData.cricket.map((match) => {
              return (
                <MDBCard className="text-center" style={{ width: '320px' }}>
                  <MDBCardBody>
                    <MDBCardTitle>{match.title}</MDBCardTitle>
                    <MDBCardText>{match.date}</MDBCardText>
                    <MDBBtn>
                      <a
                        href={match.link}
                        target="_blank"
                        className="text-light"
                        rel="noreferrer"
                      >
                        Visit
                      </a>
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              );
            })}
        </div>
        <h3 className="text-center m-3">Football</h3>
        <div className="d-flex justify-content-between align-items-center container-fluid">
          {matchesData &&
            matchesData.football.map((match) => {
              return (
                <MDBCard className="text-center" style={{ width: '320px' }}>
                  <MDBCardBody>
                    <MDBCardTitle>{match.title}</MDBCardTitle>
                    <MDBCardText>{match.date}</MDBCardText>
                    <MDBBtn>
                      <a
                        href={match.link}
                        target="_blank"
                        className="text-light"
                        rel="noreferrer"
                      >
                        Visit
                      </a>
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default LiveMatches;
