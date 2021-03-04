import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import '../css/account.css';
import axios from 'axios';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            password2: '',
            civilite: '',
            nom: '',
            prenom: '',
            date_naissance: '',
            pays: '',
            code_postal: '',
            ville: '',
            adresse: '',
            telephone: '',
            redirection: null
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.handleCivilite = this.handleCivilite.bind(this);
        this.handleNom = this.handleNom.bind(this);
        this.handlePrenom = this.handlePrenom.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handlePays = this.handlePays.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleVille = this.handleVille.bind(this);
        this.handleAdresse = this.handleAdresse.bind(this);
        this.handleTelephone = this.handleTelephone.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("utilisateur")) {
            this.setState({ redirection: true });
        }
    }

    handleEmail(e) {
        this.setState({ email: e.target.value });
    }

    handlePassword(e) {
        this.setState({ password: e.target.value });
    }

    handlePassword2(e) {
        this.setState({ password2: e.target.value });
    }

    handleCivilite(e) {
        this.setState({ civilite: e.target.value });
    }

    handleNom(e) {
        this.setState({ nom: e.target.value });
    }

    handlePrenom(e) {
        this.setState({ prenom: e.target.value });
    }

    handleDate(e) {
        this.setState({ date: e.target.value });
    }

    handlePays(e) {
        this.setState({ pays: e.target.value });
    }

    handleCode(e) {
        this.setState({ code_postal: e.target.value });
    }

    handleVille(e) {
        this.setState({ ville: e.target.value });
    }

    handleAdresse(e) {
        this.setState({ adresse: e.target.value });
    }

    handleTelephone(e) {
        this.setState({ telephone: e.target.value });
    }

    handleForm(e) {
        e.preventDefault();
        if(this.state.password === this.state.password2 & this.state.civilite !== "civilite") {
            axios({
                method: 'POST',
                url: 'https://localhost:8000/api/user/create',
                params: {
                  email: this.state.email,
                  mdp: this.state.password,
                  civilite: this.state.civilite,
                  nom: this.state.nom.toUpperCase(),
                  prenom: this.state.prenom.toUpperCase(),
                  date_naissance: this.state.date_naissance,
                  pays: this.state.pays.toUpperCase(),
                  code_postal: this.state.code_postal,
                  ville: this.state.ville.toUpperCase(),
                  adresse: this.state.adresse,
                  telephone: this.state.telephone
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    }

    render() {
        if (this.state.redirection) {
            return <Redirect to="/"/>
        }

        return (
            <Fragment>
                <center>
                    <div className="head-title">
                        <Link to="/">ReliveOne</Link>
                    </div>
                </center>
                <div className="head-title2">
                    <p>Inscription</p>
                </div>
                <div className="block-register">
                    <form onSubmit={this.handleForm}>
                        <h3>Identifiants</h3>
                        <div className="infos3">
                            <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmail} required/>
                            <input type="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handlePassword} required/>
                            <input type="password" placeholder="Confirmez le mot de passe" value={this.state.password2} onChange={this.handlePassword2} required/>
                        </div>
                        <h3>Informations personnelles <small><i>(* Obligatoire)</i></small></h3>
                        <select value={this.state.civilite} onChange={this.handleCivilite} required>
                            <option value="civilite" selected="selected">(*) Civilité</option>
                            <option value="mr">Mr</option>
                            <option value="mme">Mme</option>
                        </select>
                        <div className="infos">
                            <input type="text" placeholder="(*) Nom" value={this.state.nom} onChange={this.handleNom} required/>
                            <input type="text" placeholder="(*) Prénom" value={this.state.prenom} onChange={this.handlePrenom} required/>
                            <input type="date" placeholder="Date de naissance" value={this.state.nom} onChange={this.handleNom}/>
                        </div>
                        <input type="text" placeholder="Pays" value={this.state.pays} onChange={this.handlePays}/>
                        <div className="infos2">
                            <input type="number" placeholder="Code Postal" value={this.state.code_postal} onChange={this.handleCode}/>
                            <input type="text" placeholder="Ville" value={this.state.ville} onChange={this.handleVille}/>
                            <input type="text" placeholder="Adresse" value={this.state.adresse} onChange={this.handleAdresse}/>
                        </div>
                        <input type="text" placeholder="Téléphone" value={this.state.telephone} onChange={this.handleTelephone}/><br></br>
                        <button type="submit">S'inscrire</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default Register;
