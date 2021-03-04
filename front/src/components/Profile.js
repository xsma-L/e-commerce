import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import '../css/account.css';
import '../css/profile.css';
import axios from 'axios';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            role: '',
            redirection: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("utilisateur")) {
            axios({
                method: 'GET',
                url: 'https://localhost:8000/api/user/id=' + localStorage.getItem("utilisateur")
            })
            .then(response => {
                this.setState({ user: response.data[0], role: response.data[0].roles[0] });
                console.log(response.data[0]);
            })
            .catch(function(err) {
                console.log(err);
            })
        } else {
            this.setState({ user: null })
        }

        if (!localStorage.getItem("utilisateur")) {
            this.setState({ redirection: true });
        }
    }

    render() {
        if (this.state.redirection) {
            return <Redirect to="/"/>
        }

        var role = null;
        if (this.state.role === "ROLE_SUPER_ADMIN") {
            role = "Fondateur";
        } else if (this.state.role === "ROLE_USER") {
            role = "Membre";
        }

        return (
            <Fragment>
                <center>
                    <div className="head-title">
                        <Link to="/">ReliveOne</Link>
                    </div>
                </center>
                <div className="head-title2">
                    <p>Profil</p>
                </div>
                <div className="block-profil">
                    <div className="identite">
                        <h3>Identité</h3>
                        <p className="civilite"><b>Civilité</b> : {this.state.user.civilite}</p>
                        <p><b>Nom</b> : {this.state.user.nom}</p>
                        <p><b>Prénom</b> : {this.state.user.prenom}</p>
                        <p><b>Date de naissance</b> : {this.state.user.date_naissance}</p>
                        <p><b>Status</b> : {role}</p>
                    </div>
                    <div className="infos">
                        <h3>Informations complémentaires</h3>
                        <p><b>Email</b> : {this.state.user.email}</p>
                        <p><b>Téléphone</b> : {this.state.user.telephone}</p>
                        <p><b>Pays</b> : {this.state.user.pays}</p>
                        <p><b>Code postal</b> : {this.state.user.code_postal}</p>
                        <p><b>Ville</b> : {this.state.user.ville}</p>
                        <p><b>Adresse</b> : {this.state.user.adresse}</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Profile;
