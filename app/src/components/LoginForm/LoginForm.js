import React, {useState} from 'react';
import './LoginForm.css';
import {createSession} from '../../api/users/users';
import { withRouter } from "react-router-dom";
import { getUrlImgur } from '../../api/oauth/Imgur';

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.email.length && state.password.length) {
            props.showError(null);
            var res = createSession(state.email, state.password);
            res.then((value) => {
                if (value.userId) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))
                    localStorage.setItem("ID_TOKEN",value.userId);
                    redirectToHome();
                    props.showError(null)
                } else{
                    props.showError("Some error ocurred");
                }
            }).catch(() => {
                props.showError("Bad credential");
            })
        } else {
            props.showError('Please enter valid username and password')
        }
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }
    return(
        <div>
        <nav className="color-nav">
        <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3" style={{color: "#42B72A"}}>Dashboard</span>
        </div>
        </nav>
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center" style={{top:100, left:500}}>
            <form>
                <div className="rem">Login</div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email"
                       className="form-control"
                       id="email"
                       aria-describedby="emailHelp"
                       placeholder="Enter email"
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password"
                       className="form-control"
                       id="password"
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange}
                />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="buttonLog"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()} style={{color: "#42B72A"}}>Register</span>
            </div>
            <div className="loginImgur">
                <a href={getUrlImgur()}>Login with Imgur</a>
            </div>
        </div>
        </div>
    )
}

export default withRouter(LoginForm);