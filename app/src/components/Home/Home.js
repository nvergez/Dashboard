import React,{ useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../api/users/users';
import { getUrlTwitch } from '../../api/oauth/Twitch';
import TwitterLogin from 'react-twitter-login';

import FollowerWidgetContainer from '../Widget/FollowerTwitterWidget/NumberWidgetContainer';
import TweetWidgetContainer from '../Widget/TweetWidget/TweetWidgetContainer';
import LastDmWidgetContainer from '../Widget/LastDmWidget/LastDmWidget';
import ViewsTwitchWidgetContainer from '../Widget/ViewsTwitchWidget/ViewsTwitchWidget';
import BestStreamWidgetContainer from '../Widget/BestStreamWidget/BestStreamWidget';
import StreamWidgetContainer from '../Widget/StreamWidget/StreamWidget';

import './Home.css'

class Home extends Component {
    _isMounter = false;

    constructor() {
        super();
    }

    componentDidMount() {
        var res = getUser(localStorage.getItem("ID_TOKEN"));
        res.then((value) => {
            if (!value.id) {
                this.redirectToLogin()
            }
        })
    }

    componentDidUpdate() {
        var res = getUser(localStorage.getItem("ID_TOKEN"));
        res.then((value) => {
            if (!value.id) {
                this.redirectToLogin()
            }
        })
    }

    redirectToLogin() {
    this.props.history.push('/login');
    }

    authTwitterHandler = (err, data) => {
        localStorage.setItem("TOKEN_TWITTER", data.oauth_token)
        localStorage.setItem("SECRET_TWITTER", data.oauth_token_secret)
    };

    render() {
        return(
            <div className="mt-2">
                <div className="Home">
                    <div className="ServiceTwitch">
                        <div className="loginTwitch">
                            <a href={getUrlTwitch()}>Connect my Twitch account</a>
                        </div>
                    </div>
                    <div className="ServiceTwitter">
                        <div className="loginTwitter">
                            <TwitterLogin
                                authCallback={this.authTwitterHandler}
                                consumerKey="alNDFDcvK4g3lW965J1udkqmA"
                                consumerSecret="WoUhrTEa68fw1i5NEjrnPOZHYWHmxvc9WcHKGgvRnCrhewqpP3"
                            />
                        </div>
                        <div className="Dashboard">
                            <FollowerWidgetContainer heading="Twitter followers"/>
                            <TweetWidgetContainer heading="Tweet here !"/>
                            <LastDmWidgetContainer heading="Here, your last direct Message !"/>
                            <ViewsTwitchWidgetContainer heading="Your views number on Twitch"/>
                            <BestStreamWidgetContainer heading="First stream in viewers"/>
                            <StreamWidgetContainer heading="Search a streamer"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/*
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

    return(
        <div className="mt-2">
            <div className="Home">
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
                    <div className="Dashboard">
                        <FollowerWidgetContainer heading="Twitter followers"/>
                        <TweetWidgetContainer heading="Tweet here !"/>
                        <LastDmWidgetContainer heading="Here, your last direct Message !"/>
                        <ViewsTwitchWidgetContainer heading="Your views number on Twitch"/>
                        <BestStreamWidgetContainer heading="First stream in viewers"/>
                        <StreamWidgetContainer heading="Search a streamer"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
*/

export default withRouter(Home);