import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../api/users/users';
import { getUrlTwitch } from '../../api/oauth/Twitch';

function Home(props) {
    useEffect(() => {
        var res = getUser(localStorage.getItem("ID_TOKEN"));
        res.then((value) => {
            if (!value.id) {
                redirectToLogin()
            }
        })
      })

    function redirectToLogin() {
    props.history.push('/login');
    }

    return(
        <div className="mt-2">
            Home page content
            <div className="loginImgur">
                <a href={getUrlTwitch()}>Connect my Twitch account</a>
            </div>
        </div>
    )
}

export default withRouter(Home);