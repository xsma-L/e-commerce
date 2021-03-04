import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import '../css/home.css';
import axios from 'axios';

export class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayUser: false,
            displaySide: false,
            isUser: null,
            isElse: null,
            isActive: false,
            isActive2: false,
            isActive3: false,
            user: null
        }

        this.handleSide = this.handleSide.bind(this);
        this.closeUser = this.closeUser.bind(this);
        this.closeSide = this.closeSide.bind(this);
        this.logout = this.logout.bind(this);
        this.removeCart = this.removeCart.bind(this);
    }

    componentDidMount() {
        if (window.location.href.includes('mode-homme')) {
            this.setState({ isActive: true });
        } else {
            this.setState({ isActive: false });
        }

        if (window.location.href.includes('mode-femme')) {
            this.setState({ isActive2: true });
        } else {
            this.setState({ isActive2: false });
        }

        if (window.location.href.includes('custom')) {
            this.setState({ isActive3: true });
        } else {
            this.setState({ isActive3: false });
        }

        if (localStorage.getItem("utilisateur")) {
            axios({
                method: 'GET',
                url: 'https://localhost:8000/api/user/id=' + localStorage.getItem("utilisateur")
            })
            .then(response => {
                this.setState({ user: response.data[0] });
            })
            .catch(function(err) {
                console.log(err);
            })
        } else {
            this.setState({ user: null })
        }
    }

    handleSide(e) {
        if (e.target.id === "user") {
            this.setState({ isUser: true, displayUser: true });
        } else if (e.target.id === "fav") {
            this.setState({ isElse: true, displaySide: true });
        } else if (e.target.id === "logged") {
            this.setState({ isUser: false, displayUser: true});
        } else {
            this.setState({ isElse: false, displaySide: true });
        }
    }

    closeUser() {
        this.setState({ displayUser: false });
    }

    closeSide() {
        this.setState({ displaySide: false });
    }

    logout() {
        localStorage.removeItem("utilisateur");
        this.setState({ displayUser: false });
    }

    removeCart(e) {
        var getLocalStorage = localStorage.getItem("cart");
        var parse = JSON.parse(getLocalStorage);
        parse.map(x => {
            parse.splice(parse.indexOf(x), 1);
            localStorage.setItem("cart", JSON.stringify(parse));
        })
    }

    render() {
        var SideUser = null;

        if(this.state.displayUser === true) {
            this.state.isUser ?
                SideUser = (
                    <div className="navbar-sideUser">
                        <div className="navbar-bodyUser-left" onClick={this.closeUser}></div>
                        <div className="navbar-bodyUser-right">
                            <h1><i className="fa fa-times" onClick={this.closeUser}></i></h1>
                            <div className="navbar-bodyUser-title">
                                <p>Votre compte</p>
                            </div>
                            <div className="navbar-bodyUser-content">
                                <div className="login">
                                    <Link to="/connexion">Connexion</Link>
                                </div>
                                <div className="register">
                                    <Link to="/inscription">Inscription</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) :
                SideUser = (
                    <div className="navbar-sideLogged">
                        <div className="navbar-bodyLogged-left" onClick={this.closeUser}></div>
                        <div className="navbar-bodyLogged-right">
                            <h1><i className="fa fa-times" onClick={this.closeUser}></i></h1>
                            <div className="navbar-bodyLogged-title">
                                <p>Votre compte</p>
                            </div>
                            <div className="navbar-bodyLogged-content">
                                <p>{this.state.user.prenom} {this.state.user.nom}</p>
                                <div className="content-actions">
                                    <Link to="/profil">Voir mon profil</Link>
                                    <button className="logout-btn" onClick={this.logout}>Se déconnecter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }

        if (localStorage.getItem("cart") !== null) {
            var getLocalStorage = localStorage.getItem("cart");
            var parse = JSON.parse(getLocalStorage);
            var displayCart = null;
            var prix = 0;
            var sexe = null;
            if (window.location.href.includes("mode-femme")) {
                sexe = "femme";
            } else {
                sexe = "homme";
            }
            if (parse.length > 0) {
                displayCart = parse.map(e => {
                    if (parse.indexOf(e) === 0) {
                        prix = Number(e.prix);
                    } else {
                        prix += Number(e.prix);
                    }
                    return (
                        <Fragment>
                            <div className="cart-element">
                                <img src={process.env.PUBLIC_URL + "/articles/" + e.image} alt={e.image}/>
                                <div className="element-infos">
                                    <p><b>{e.marque}</b> - {e.nom}</p>
                                    <p><b>Prix</b> : {e.prix} €</p>
                                    <Link to={"/mode-" + sexe + "/article/" + e.id}>Fiche produit</Link>
                                    <br></br><br></br>
                                    <Link id={e.id} onClick={this.removeCart}>Retirer du panier</Link>
                                </div>
                            </div>
                        </Fragment>
                    )
                })
                var displayPrix = (
                    <Fragment>
                        <div className="prix">
                            <Link to="/paiement"><b>Total : {prix} € <i className="fa fa-shopping-cart"></i></b></Link>
                        </div>
                    </Fragment>
                )
            } else {
                displayCart = (
                    <Fragment>
                        <center><p><b>Aucun article dans votre panier</b></p></center>
                    </Fragment>
                )
            }
        }

        var Side = null;
        if(this.state.displaySide === true) {
            this.state.isElse ?
                Side = null :
                Side = (
                    <div className="navbar-sideCart">
                        <div className="navbar-bodyCart-left" onClick={this.closeSide}></div>
                        <div className="navbar-bodyCart-right">
                            <h1><i className="fa fa-times" onClick={this.closeSide}></i></h1>
                            <div className="navbar-bodyCart-title">
                                <p>Votre panier</p>
                            </div>
                            {displayCart}
                            {displayPrix}
                        </div>
                    </div>
                );
        }

        var user = null;
        if (localStorage.getItem("utilisateur")) {
            user = (
                <Fragment>
                    <i id="logged" className="fa fa-user" onClick={this.handleSide}></i>
                </Fragment>
            )
        } else {
            user = (
                <Fragment>
                    <i id="user" className="fa fa-user-o" onClick={this.handleSide}></i>
                </Fragment>
            )
        }

        return(
          <Fragment>
              {SideUser}
              {Side}
              <div className="navbar-head">
                  <div className="navbar-search">
                      <form>
                          <input type="text" id="search" name="search" placeholder="Rechercher sur ReliveOne" />
                          <button type="submit"><i className="fa fa-search"></i></button>
                      </form>
                  </div>
                  <div className="navbar-title">
                      <Link to="/">ReliveOne</Link>
                  </div>
                  <div className="navbar-tools">
                      {user}
                      <i id="cart" className="fa fa-shopping-bag" onClick={this.handleSide}></i>
                  </div>
              </div>
              <div className="navbar-menu">
                  <Link to="/mode-femme" className={this.state.isActive2 ? 'active' : 'non'}>Mode Femme</Link>
                  <Link to="/mode-homme" className={this.state.isActive ? 'active' : 'non'}>Mode Homme</Link>
                  <Link to="/custom" className={this.state.isActive3 ? 'active' : 'non'}>Custom</Link>
              </div>
          </Fragment>
        )
    }
}

export default Navbar;
