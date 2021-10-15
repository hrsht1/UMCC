import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YoutubeIcon from "@material-ui/icons/YouTube";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      {/* <h3
        style={{
          color: "#FC8268",
          textAlign: "center",
          marginTop: "-50px",
          fontFamily: "sans-serif",
        }}
      >
        Upper Murray Community Calendar: One stop for all updates
      </h3> */}
      <div className="footer-component">
        <footer className="page-footer indigo darken-3">
          <div id="footer" className="red accent-2">
            <div className="row">
              <div className="col m3 s12">
                <h5 className="white-text">About Us</h5>
                <ul>
                  <li>
                    <a className="grey-text text-lighten-3" href="/">
                      Community Calendar
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="https://corryongnc.org/">
                      Corryong Neighbourhood Centre
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col m3 s12">
                <h5 className="white-text">Services</h5>
                <ul>
                  <li>
                    <a
                      className="grey-text text-lighten-3"
                      href="https://corryongnc.org/upper-murray-community-bakery/"
                    >
                      Upper Murray Community Bakery
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="https://corryongnc.org/upper-murray-community-garage/">
                      Upper Murray Community Garage
                    </a>
                  </li>
                  <li>
                    <a className="grey-text text-lighten-3" href="https://corryongnc.org/upper-murray-innovation-foundation/">
                      Upper Murray Innovation Foundation
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col m3 s12">
                <h5 className="white-text">Contact Us</h5>
                <ul>
                  <li>
                    <a
                      className="grey-text text-lighten-3"
                      href="https://corryongnc.org/contact/"
                    >
                      Corryong Neighbourhood Centre (CNC)
                    </a>

                  </li>
                  <li>
                    39 Hanson St Corryong, VIC 3707
                  </li>
                  <li>
                   <a href="tel:(02) 6076 2176">(02) 6076 2176</a>
                  </li>
                  <li>
                    <a href="mailto:admin@corryongnc.org">admin@corryongnc.org</a>
                  </li>
                  <li>
                    <a
                      className="grey-text text-lighten-4"
                      href="https://www.facebook.com/CorryongNeighbourhoodCentre/"
                      style={{ color: "white" }}
                    >
                      <FacebookIcon fontSize="large" />
                    </a>
                    <a
                      className="grey-text text-lighten-4"
                      href="https://www.instagram.com/corryongnc/?hl=en"
                      style={{ paddingLeft: "20px", color: "white" }}
                    >
                      <InstagramIcon fontSize="large" />
                    </a>
                    {/* <a
                      className="grey-text text-lighten-4"
                      href="https://twitter.com/"
                      style={{ paddingLeft: "20px", color: "white" }}
                    >
                      <TwitterIcon fontSize="large" />
                    </a>
                    <a
                      className="grey-text text-lighten-4"
                      href="https://www.youtube.com/"
                      style={{ paddingLeft: "20px", color: "white" }}
                    >
                      <YoutubeIcon fontSize="large" />
                    </a> */}
                  </li>
                </ul>
              </div>
              <div className="col m3 s12">
                <h5 className="white-text">Important Links</h5>
                <ul>
                  <li>
                    <a
                      className="grey-text text-lighten-3"
                      href="https://www.vic.gov.au/bushfire-recovery-victoria"
                    >
                      <span style={{ marginLeft: "10px" }}>
                        Bushfire Recovery
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="center">
            <div className="red accent-2 ">Made in 2021 for the Corryong Neighbourhood Centre</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
