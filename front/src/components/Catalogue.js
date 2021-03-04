import React, { Component, Fragment } from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import { Link } from "react-router-dom";
import '../css/catalogue.css';
import axios from 'axios';

export class Catalogue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            typeValue: "type",
            categorieValue: "categorie",
            marqueValue: "marque",
            couleurValue: "couleur"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'https://localhost:8000/api/articles/'
        })
        .then(response => {
            var array = [];
            if (window.location.href.includes('mode-femme')) {
                response.data.map(e => {
                    if (e.sexe === "femme") {
                        array.push(e);
                    }
                });
                this.setState({ data: array });
            } else {
                response.data.map(e => {
                    if (e.sexe === "homme") {
                        array.push(e);
                    }
                });
                this.setState({ data: array });
            }
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    handleChange(e) {
        this.setState({ typeValue: e.target.value });
        this.filterChange();
    }

    handleChange2(e) {
        this.setState({ categorieValue: e.target.value });
        this.filterChange();
    }

    handleChange3(e) {
        this.setState({ marqueValue: e.target.value });
        this.filterChange();
    }

    handleChange4(e) {
        this.setState({ couleurValue: e.target.value });
        this.filterChange();
    }

    filterChange() {
      var sexe = null;

      if (window.location.href.includes('mode-femme')) {
          sexe = "femme";
      } else {
          sexe = "homme";
      }

      axios({
          method: 'GET',
          url: 'https://localhost:8000/api/articles'
      })
      .then(response => {
          var array = [];
          response.data.map(e => {
              if (e.sexe === sexe && this.state.typeValue === "type" && this.state.categorieValue === "categorie" && this.state.marqueValue === "marque" && this.state.couleurValue === "couleur") {
                  array.push(e);
              } else if (e.sexe === sexe && this.state.typeValue === "type" && this.state.categorieValue === "categorie" && e.marque === this.state.marqueValue && this.state.couleurValue === "couleur") {
                  array.push(e);
              } else if (e.sexe === sexe && this.state.typeValue === "type" && this.state.categorieValue === "categorie" && this.state.marqueValue === "marque" && e.couleur === this.state.couleurValue) {
                  array.push(e);
              } else if (e.sexe === sexe && this.state.typeValue === "type" && this.state.categorieValue === "categorie" && e.marque === this.state.marqueValue && e.couleur === this.state.couleurValue) {
                  array.push(e);
              } else if (e.sexe === sexe && e.type === this.state.typeValue && this.state.categorieValue === "categorie" && this.state.marqueValue === "marque" && this.state.couleurValue === "couleur") {
                  array.push(e);
              } else if (e.sexe === sexe && e.type === this.state.typeValue && e.categorie === this.state.categorieValue && this.state.marqueValue === "marque" && this.state.couleurValue === "couleur") {
                  array.push(e);
              } else if (e.sexe === sexe && e.type === this.state.typeValue && this.state.categorieValue === "categorie" && e.marque === this.state.marqueValue && this.state.couleurValue === "couleur") {
                  array.push(e);
              } else if (e.sexe === sexe && e.type === this.state.typeValue && e.categorie === this.state.categorieValue && e.marque === this.state.marqueValue && this.state.couleurValue === "couleur") {
                  array.push(e);
              } else if (e.sexe === sexe && e.type === this.state.typeValue && this.state.categorieValue === "categorie" && this.state.marqueValue === "marque" && e.couleur === this.state.couleurValue) {
                  array.push(e);
              } else if (e.sexe === sexe && e.type === this.state.typeValue && e.categorie === this.state.categorieValue && this.state.marqueValue === "marque" && e.couleur === this.state.couleurValue) {
                  array.push(e);
              } else if (e.sexe === sexe && e.type === this.state.typeValue && e.categorie === this.state.categorieValue && e.marque === this.state.marqueValue && e.couleur === this.state.couleurValue) {
                  array.push(e);
              }
              this.setState({ data: array });
          })
      })
      .catch(function(err) {
          console.log(err);
      })
    }

    render() {
        var sexe = null;
        if (window.location.href.includes('mode-femme')) {
            sexe = "femme";
        } else {
            sexe = "homme";
        }

        var displayArticles = this.state.data.map(e => {
            return (
                <Fragment key={e.id}>
                    <div className="catalogue-article">
                        <Link to={"mode-" + sexe + "/article/" + e.id} params={{ id: e.id }}>
                            <img src={process.env.PUBLIC_URL + "/articles/" + e.image} alt={e.image}/>
                        </Link>
                        <Link to={"mode-" + sexe + "/article/" + e.id} params={{ id: e.id }}>
                            <p><span>{e.marque}</span> - {e.nom}</p>
                            <p><b>{e.prix} €</b></p>
                        </Link>
                    </div>
                </Fragment>
            )
        })

        var filterCategorie = null;
        if (this.state.typeValue === "vetements") {
            if (window.location.href.includes('mode-femme')) {
                filterCategorie = (
                    <Fragment>
                        <div className="box">
                            <select value={this.state.categorieValue} onChange={this.handleChange2}>
                                <option selected="selected" value="categorie">Categorie</option>
                                <option value="costumes/accessoires">Costumes et accessoires</option>
                                <option value="ensembles">Ensembles</option>
                                <option value="jeans/pantalons">Jeans et pantalons</option>
                                <option value="jupes">Jupes</option>
                                <option value="pulls/sweats">Pulls et sweat-shirts</option>
                                <option value="robes">Robes</option>
                                <option value="shorts">Shorts</option>
                                <option value="sous/pyjamas">Sous-vêtements et pyjamas</option>
                                <option value="tops">Tops</option>
                                <option value="vestes/manteaux">Vestes et manteaux</option>
                            </select>
                        </div>
                    </Fragment>
                )
            } else {
                filterCategorie = (
                    <Fragment>
                        <div className="box">
                            <select value={this.state.categorieValue} onChange={this.handleChange2}>
                                <option selected="selected" value="categorie">Categorie</option>
                                <option value="costumes/accessoires">Costumes et accessoires</option>
                                <option value="ensembles">Ensembles</option>
                                <option value="jeans/pantalons">Jeans et pantalons</option>
                                <option value="pulls/sweats">Pulls et sweat-shirts</option>
                                <option value="shorts">Shorts</option>
                                <option value="sous/pyjamas">Sous-vêtements et pyjamas</option>
                                <option value="tops">Tops</option>
                                <option value="vestes/manteaux">Vestes et manteaux</option>
                            </select>
                        </div>
                    </Fragment>
                )
            }
        } else if (this.state.typeValue === "chaussures") {
            filterCategorie = (
                <Fragment>
                    <div className="box">
                        <select value={this.state.categorieValue} onChange={this.handleChange2}>
                            <option selected="selected" value="categorie">Categorie</option>
                            <option value="baskets">Baskets</option>
                            <option value="bottes">Bottes</option>
                            <option value="chaussons">Chaussons</option>
                            <option value="chaussures">Chaussures</option>
                            <option value="claquettes">Claquettes</option>
                            <option value="sandales">Sandales</option>
                            <option value="tongs">Tongs</option>
                        </select>
                    </div>
                </Fragment>
            )
        } else if (this.state.typeValue === "accessoires") {
            filterCategorie = (
                <Fragment>
                    <div className="box">
                        <select value={this.state.categorieValue} onChange={this.handleChange2}>
                            <option selected="selected" value="categorie">Categorie</option>
                            <option value="bagues">Bagues</option>
                            <option value="bonnets">Bonnets</option>
                            <option value="boucles-oreilles">Boucles d'oreilles</option>
                            <option value="bracelets">Bracelets</option>
                            <option value="casquettes">Casquettes</option>
                            <option value="ceintures">Ceintures</option>
                            <option value="chapeaux">Chapeaux</option>
                            <option value="colliers">Colliers</option>
                            <option value="lunettes-soleil">Lunettes de soleil</option>
                            <option value="montres">Montres</option>
                        </select>
                    </div>
                </Fragment>
            )
        }

        var displayPage = null;

        if (this.state.data.length > 0) {
            displayPage = (
                <Fragment>
                    <div className="catalogue-articles">
                        {displayArticles}
                    </div>
                </Fragment>
            )
        } else {
            displayPage = (
                <Fragment>
                    <div className="blank"></div>
                </Fragment>
            )
        }

        return(
            <Fragment>
                <Navbar/>
                <div className="filters">
                    <div className="box">
                        <select value={this.state.typeValue} onChange={this.handleChange}>
                            <option selected="selected" value="type">Type</option>
                            <option value="vetements">Vêtements</option>
                            <option value="chaussures">Chaussures</option>
                            <option value="accessoires">Accessoires</option>
                        </select>
                    </div>
                    {filterCategorie}
                    <div className="box">
                        <select value={this.state.marqueValue} onChange={this.handleChange3}>
                            <option selected="selected" value="marque">Marque</option>
                            <option value="adidas">Adidas</option>
                            <option value="bershka">Bershka</option>
                            <option value="levis">Levi's</option>
                            <option value="new-balance">New Balance</option>
                            <option value="nike">Nike</option>
                            <option value="pull-n-bear">Pull&Bear</option>
                            <option value="puma">Puma</option>
                            <option value="reliveone">ReliveOne</option>
                            <option value="the-north-face">The North Face</option>
                        </select>
                    </div>
                    <div className="box">
                        <select value={this.state.couleurValue} onChange={this.handleChange4}>
                            <option selected="selected" value="couleur">Couleur</option>
                            <option value="argente">Argenté</option>
                            <option value="beige">Beige</option>
                            <option value="blanc">Blanc</option>
                            <option value="bleu">Bleu</option>
                            <option value="creme">Crème</option>
                            <option value="cuivre">Cuivre</option>
                            <option value="dore">Doré</option>
                            <option value="gris">Gris</option>
                            <option value="jaune">Jaune</option>
                            <option value="multi">Multi</option>
                            <option value="navy">Navy</option>
                            <option value="noir">Noir</option>
                            <option value="orange">Orange</option>
                            <option value="rose">Rose</option>
                            <option value="rouge">Rouge</option>
                            <option value="vert">Vert</option>
                            <option value="violet">Violet</option>
                        </select>
                    </div>
                </div>
                <p className="infos-articles">{this.state.data.length} article(s) trouvé(s)</p>
                {displayPage}
                <Footer/>
            </Fragment>
        )
    }
}

export default Catalogue;
