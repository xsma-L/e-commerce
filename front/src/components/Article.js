import React, { Component, Fragment } from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/catalogue.css';
import axios from 'axios';

export class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            img_name: '',
            cart: [],
            displayBtn: true
        }

        this.handleAlt = this.handleAlt.bind(this);
        this.addCart = this.addCart.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'https://localhost:8000/api/articles/'
        })
        .then(response => {
            response.data.map(e => {
                if (e.id == this.props.match.params.id) {
                    this.setState({ data: e, img_name: e.image });
                }
            })
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    handleAlt(e) {
        this.setState({ img_name: e.target.alt });
    }

    addCart() {
        var getLocalStorage = localStorage.getItem("cart");
        if (getLocalStorage === null) {
            this.state.cart.push(this.state.data);
            localStorage.setItem("cart", JSON.stringify(this.state.cart));
        } else {
            var parse = JSON.parse(getLocalStorage);
            parse.map(x => {
                this.state.cart.push(x);
            });
            this.state.cart.push(this.state.data);
            localStorage.setItem("cart", JSON.stringify(this.state.cart));
        }
    }

    render() {
        return(
            <Fragment>
                <Navbar/>
                <div className="article-container">
                    <div className="block-img">
                        <div className="container-img">
                            <img src={process.env.PUBLIC_URL + "/articles/" + this.state.data.image} alt={this.state.data.image} onClick={this.handleAlt}/>
                            <img src={process.env.PUBLIC_URL + "/articles/" + this.state.data.image2} alt={this.state.data.image2} onClick={this.handleAlt}/>
                            <img src={process.env.PUBLIC_URL + "/articles/" + this.state.data.image3} alt={this.state.data.image3} onClick={this.handleAlt}/>
                            <img src={process.env.PUBLIC_URL + "/articles/" + this.state.data.image4} alt={this.state.data.image4} onClick={this.handleAlt}/>
                        </div>
                        <img src={process.env.PUBLIC_URL + "/articles/" + this.state.img_name} alt={this.state.img_name}/>
                    </div>
                    <div className="container-infos">
                        <h3><span>{this.state.data.marque}</span> - {this.state.data.nom}</h3>
                        <p><span>Couleur:</span> {this.state.data.couleur}</p>
                        <p><span>Référence:</span> {this.state.data.id}</p>
                        <p><span>Prix:</span> {this.state.data.prix} €</p>
                        <button onClick={this.addCart}>Ajouter au panier <i class="fa fa-cart-plus"></i></button>
                    </div>
                </div>
                <Footer/>
            </Fragment>
        )
    }
}

export default Article;
