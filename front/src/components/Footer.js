import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import '../css/footer.css';

export class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <Fragment>
                <div className="footer-block-social">
                    <div className="footer-social-pay">
                        <div className="social">
                            <Link to="#"><i className="fa fa-facebook"></i></Link>
                            <Link to="#"><i className="fa fa-instagram"></i></Link>
                            <Link to="#"><i className="fa fa-snapchat-ghost"></i></Link>
                            <Link to="#"><i className="fa fa-twitter"></i></Link>
                        </div>
                        <div className="pay">
                            <i className="fa fa-cc-visa"></i>
                            <i className="fa fa-cc-mastercard"></i>
                            <i className="fa fa-cc-paypal"></i>
                            <i className="fa fa-cc-amex"></i>
                        </div>
                    </div>
                </div>
                <div className="footer-details">
                    <div className="details-block">
                        <div className="infos">
                            <h3>Aide & information</h3>
                            <Link to="#">Assistance</Link>
                            <Link to="#">Livraisons et retours</Link>
                        </div>
                        <div className="reliveone">
                            <h3>à propos de reliveone</h3>
                            <Link to="#">A propos de ReliveOne</Link>
                            <Link to="#">ReliveOne recrute</Link>
                            <Link to="#">Investisseurs</Link>
                        </div>
                    </div>
                </div>
                <div className="footer-last">
                    <div className="footer-credits">
                        <div className="tag">
                            <p>Inspiré par <a href="https://www.asos.com/fr/homme/">ASOS</a></p>
                        </div>
                        <div className="doc">
                            <Link to="#">Confidentialité & cookies</Link>
                            <Link to="#" className="middle">Conditions générales</Link>
                            <Link to="#" className="toHide">Accessibilité</Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Footer;
