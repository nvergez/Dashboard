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
import VideoViewsWidgetContainer from '../Widget/VideoViewsWidget/VideoViewsWidget';
import ChannelSubsWidgetContainer from '../Widget/ChannelSubsWidget/ChannelSubsWidget';
import LastCommentWidgetContainer from '../Widget/LastCommentWidget/LastCommentWidget';

import './Home.css'

class Home extends Component {
    _isMounter = false;

    constructor(props) {
        super(props);

        this.state = {
            twitterFollowers: (localStorage.getItem("twitterFollowers") === "true") ? true : false,
            makeATweet: (localStorage.getItem("makeATweet") === "true") ? true : false,
            LastDm: (localStorage.getItem("LastDm") === "true") ? true : false,
            twitchViews: (localStorage.getItem("twitchViews") === "true") ? true : false,
            firstStream: (localStorage.getItem("firstStream") === "true") ? true : false,
            searchStream: (localStorage.getItem("searchStream") === "true") ? true : false,
            viewVideoCount: (localStorage.getItem("viewVideoCount") === "true") ? true : false,
            subsChannelCount: (localStorage.getItem("subsChannelCount") === "true") ? true : false,
            LastComment: (localStorage.getItem("LastComment") === "true") ? true : false,
            renderView: false,
            twitterAuth: localStorage.getItem("TOKEN_TWITTER") ? true : false
        }

    }

    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
        localStorage.setItem(event.target.name, event.target.checked);
      };

    clickBtn = () => {
        {this.state.renderView === false ?
        this.setState({ ...this.state, renderView: true})
        : this.setState({ ...this.state, renderView: false})}
    };

    componentDidMount() {
        var res = getUser(localStorage.getItem("ID_TOKEN"));
        res.then((value) => {
            if (!value.id) {
                this.redirectToLogin()
            }
        })
    }

    handleLogout() {
        localStorage.removeItem("ID_TOKEN")
        this.props.history.push('/login')
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
        if (typeof data == "undefined")
            return;
        if (typeof data.oauth_token == "undefined")
            return;
        localStorage.setItem("TOKEN_TWITTER", data.oauth_token)
        localStorage.setItem("SECRET_TWITTER", data.oauth_token_secret)
        this.setState({ ...this.state, twitterAuth: true })
    };

    renderMenu() {
        if (this.state.renderView === true) {
                return (
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
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose your youtube's widgets</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.viewVideoCount} onChange={this.handleChange} name="viewVideoCount" />}
                            label="Get the number of views of the choosen video"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.subsChannelCount} onChange={this.handleChange} name="subsChannelCount" />}
                            label="Get the number of subscribers of the choosen channel"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.LastComment} onChange={this.handleChange} name="LastComment" />}
                            label="Get the last comment of the choosen video"
                        />
                    </FormGroup>
                </FormControl>
            </div>
            )
        }
    }

    render() {
        return(
            <div>
            <nav className="color-nav">
            <div className="row col-12 d-flex justify-content-center text-white">
            <div className="mr-auto">
                <button className="buttonL"
                    onClick={this.clickBtn}
                    style={{width: "100px", height :42, color: "#ffffff"}}>
                        Menu
                </button>
            </div>
            <span className="h3" style={{color: "#42B72A"}}>Dashboard</span>
            <div className="ml-auto">
                    <button className="buttonL"
                    onClick={() => this.handleLogout()}
                    style={{width: "100px", height :42, color: "#ffffff"}}>
                        Logout
                    </button>
                </div>
                </div>
            </nav>
                {this.renderMenu()}
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
                        {this.state.viewVideoCount ? <VideoViewsWidgetContainer heading="Youtube video views count"/> : null}
                        {this.state.subsChannelCount ? <ChannelSubsWidgetContainer heading="Youtube channel subscribers count"/> : null}
                        {this.state.LastComment ? <LastCommentWidgetContainer heading="Last comment youtube video"/> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);