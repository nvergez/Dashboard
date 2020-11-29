import React from 'react';
import { createUser, createSession } from '../../api/users/users';
import { withRouter } from "react-router-dom";
import url from "url";
import { getImgurAccount } from '../../api/oauth/Imgur'

function ImgurCallback(props) {
    var new_url = props.url.replace("#", "?");
    var query = url.parse(new_url, true).query;

    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.history.push('/login'); 
        props.updateTitle('Login');
    }

    if (query.error) {
        redirectToLogin();
        props.showError("Access deny.")
    }
    
    if (query.access_token) {
        var res = getImgurAccount(query.access_token);
        res.then((result) => {
            if (result.data.email) {
                createUser(result.data.email, "imgur", "null").then((obj) => {
                    console.log("New user by imgur: " + obj.id)

                    if (obj.id) {
                        localStorage.setItem("ID_TOKEN",obj.id);
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                    
                }).catch(() => {
                    createSession(result.data.email, "imgur").then((obj) => {
                        console.log("Existing user by imgur: " + obj.userId)

                        if (obj.userId) {
                            localStorage.setItem("ID_TOKEN",obj.userId);
                            redirectToHome();
                            props.showError(null)
                        } else{
                            props.showError("Some error ocurred");
                        }
                    }).catch(() => {
                        console.log("Cant login user: " + result.data.email)
                        redirectToLogin();
                        props.showError(null)
                    })
                })
            }
        }).catch(() => {
            console.log("Rejected")
            redirectToLogin();
            props.showError(null)
        })
    }
    
    return(
        <p>Loading ...</p>
    )
}

export default withRouter(ImgurCallback);