import React, { Component, Fragment } from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

export class Custom extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <Fragment>
                <Navbar/>

                <Footer/>
            </Fragment>
        )
    }
}

export default Custom;
