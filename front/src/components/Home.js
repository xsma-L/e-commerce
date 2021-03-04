import React, { Component, Fragment } from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import { Link } from "react-router-dom";
import '../css/home.css';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
          <Fragment>
              <Navbar/>
              <div className="home-banner">
                  <img src={process.env.PUBLIC_URL + 'homepage/banner.jpg'} alt="banner"/>
                  <div className="banner-description">
                      <p>Nouveautés hommes</p>
                      <Link to="/mode-homme">Découvrir</Link>
                  </div>
              </div>
              <div className="home-wallpaper">
                  <div className="home-content">
                      <div className="content">
                          <img src={process.env.PUBLIC_URL + 'homepage/home-femme2.jpg'} alt="img1"/>
                          <div className="content-description">
                              <p>Accessoires</p>
                              <Link to="/mode-femme">Découvrir</Link>
                          </div>
                      </div>
                      <div className="content">
                          <img src={process.env.PUBLIC_URL + 'homepage/home-femme.jpg'} alt="img2"/>
                          <div className="content-description">
                              <p>Hauts à gogo</p>
                              <Link to="/mode-femme">Découvrir</Link>
                          </div>
                      </div>
                      <div className="content">
                          <img src={process.env.PUBLIC_URL + 'homepage/home-homme.jpg'} alt="img3"/>
                          <div className="content-description">
                              <p>Sandales</p>
                              <Link to="/mode-homme">Découvrir</Link>
                          </div>
                      </div>
                      <div className="content">
                          <img src={process.env.PUBLIC_URL + 'homepage/home-mask.jpg'} alt="img4"/>
                          <div className="content-description">
                              <p>Masques</p>
                              <Link to="/mode-homme">Découvrir</Link>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="home-infos">
                  <p>Livraison et retour gratuits</p>
              </div>
              <Footer/>
          </Fragment>
        )
    }
}

export default Home;
