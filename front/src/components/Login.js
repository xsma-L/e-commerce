import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import '../css/account.css';
import axios from 'axios';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            wrong: null,
            redirection: null
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("utilisateur")) {
            this.setState({ redirection: true });
        }
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        axios({
            method: 'GET',
            url: 'https://localhost:8000/api/user/email=' + this.state.email + '&mdp=' + this.state.password
        })
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem("utilisateur", response.data[0].id);
                this.setState({ redirection: true });
            } else {
                if (response.data.status === "Email incorrect ou inexistant") {
                    this.setState({ wrong: true });
                } else {
                    this.setState({ wrong: false });
                }
            }
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    render() {
        if (this.state.redirection) {
            return <Redirect to="/"/>
        }

        var error = null;
        if (this.state.wrong === true) {
            error = (
                <p className="error">Adresse e-mail incorrecte ou inexsitante</p>
            )
        }

        if (this.state.wrong === false) {
            error = (
                <p className="error">Mot de passe incorrect</p>
            )
        }

        return(
            <Fragment>
                <center>
                    <div className="head-title">
                        <Link to="/">ReliveOne</Link>
                    </div>
                </center>
                <div className="head-title2">
                    <p>Connexion</p>
                </div>
                <div className="block-login">
                    <form>
                        {error}
                        <input type="email" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} required />
                        <input type="password" id="password" name="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handlePasswordChange} required />
                        <Link to="/process/mail">Mot de passe oublié ?</Link>
                        <button type="submit" onClick={e => this.handleSubmit(e)}>Se connecter</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default Login;
