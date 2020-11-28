import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../api/users/users';
import { getUrlTwitch } from '../../api/oauth/Twitch';
import TwitterLogin from 'react-twitter-login';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

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

        this.state = {
            twitterFollowers: false,
            makeATweet: false,
            LastDm: false,
            twitchViews: false,
            firstStream: false,
            searchStream: false,
            twitterAuth: localStorage.getItem("TOKEN_TWITTER") ? true : false
        }
    }

    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
      };

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
        this.setState({ ...this.state, twitterAuth: true })
    };

    render() {
        return(
            <div className="mt-2">
                {this.state.twitterAuth ? <FormControl component="fieldset">
                    <FormLabel component="legend">Choose your twitter's widgets</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.twitterFollowers} onChange={this.handleChange} name="twitterFollowers" />}
                            label="Twitter followers counter"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.makeATweet} onChange={this.handleChange} name="makeATweet" />}
                            label="Make a tweet"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.LastDm} onChange={this.handleChange} name="LastDm" />}
                            label="See your last DM"
                        />
                    </FormGroup>
                </FormControl> : null}
                {localStorage.getItem("TOKEN_TWITCH") ? <FormControl component="fieldset">
                    <FormLabel component="legend">Choose your twitch's widgets</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.twitchViews} onChange={this.handleChange} name="twitchViews" />}
                            label="Get the number of views on your channel"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.firstStream} onChange={this.handleChange} name="firstStream" />}
                            label="Get the first stream"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.searchStream} onChange={this.handleChange} name="searchStream" />}
                            label="Get a stream by username"
                        />
                    </FormGroup>
                </FormControl> : null}
                <div className="Home">
                    <div className="ServiceTwitch">
                        {localStorage.getItem("TOKEN_TWITCH") == null ? <div className="loginTwitch">
                            <a href={getUrlTwitch()}>Connect my Twitch account</a>
                        </div> : null}
                    </div>
                    <div className="ServiceTwitter">
                        {localStorage.getItem("TOKEN_TWITTER") == null ? <div className="loginTwitter">
                            <TwitterLogin
                                authCallback={this.authTwitterHandler}
                                consumerKey="alNDFDcvK4g3lW965J1udkqmA"
                                consumerSecret="WoUhrTEa68fw1i5NEjrnPOZHYWHmxvc9WcHKGgvRnCrhewqpP3"
                            />
                        </div> : null}
                    </div>
                    <div className="Dashboard">
                        {this.state.twitterFollowers ? <FollowerWidgetContainer heading="Twitter followers"/> : null}
                        {this.state.makeATweet ? <TweetWidgetContainer heading="Tweet here !"/> : null}
                        {this.state.LastDm ? <LastDmWidgetContainer heading="Here, your last direct Message !"/> : null}
                        {this.state.twitchViews ? <ViewsTwitchWidgetContainer heading="Your views number on Twitch"/> : null}
                        {this.state.firstStream ? <BestStreamWidgetContainer heading="First stream in viewers"/> : null}
                        {this.state.searchStream ? <StreamWidgetContainer heading="Search a streamer"/> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);