import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../api/users/users';
import { getUrlTwitch } from '../../api/oauth/Twitch';
import { getTwitchUsername, getTwitchViews} from '../../api/Twitch/Twitch';
import TwitterLogin from 'react-twitter-login';
import { getFollowersCount, newTweet, getLastDm } from '../../api/Twitter/Twitter';

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

    const authTwitterHandler = (err, data) => {
        localStorage.setItem("TOKEN_TWITTER", data.oauth_token)
        localStorage.setItem("SECRET_TWITTER", data.oauth_token_secret)
    };
/*
    getFollowersCount(localStorage.getItem("TOKEN_TWITTER"), localStorage.getItem("SECRET_TWITTER"))
    .then((value) => {
        console.log(value); // print th number of followers. -1 if error (number of requests exceed)
    })

    newTweet(localStorage.getItem("TOKEN_TWITTER"), localStorage.getItem("SECRET_TWITTER"), "hello")
    .then((value) => {
        if (value)
            console.log("tweeted")
        else
            console.log("not tweeted")
    })

    getLastDm(localStorage.getItem("TOKEN_TWITTER"), localStorage.getItem("SECRET_TWITTER"))
    .then((value) => {
        console.log(value); // print the last dm.
    })
*/

    return(
        <div className="mt-2">
            Home page
            <div className="ServiceTwitch">
                <div className="loginTwitch">
                    <a href={getUrlTwitch()}>Connect my Twitch account</a>
                </div>
            </div>
            <div className="ServiceTwitter">
                <div className="loginTwitter">
                    <TwitterLogin
                        authCallback={authTwitterHandler}
                        consumerKey="alNDFDcvK4g3lW965J1udkqmA"
                        consumerSecret="WoUhrTEa68fw1i5NEjrnPOZHYWHmxvc9WcHKGgvRnCrhewqpP3"
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);