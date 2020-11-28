import React, { Component } from 'react';
import Widget from '../Widget';

import { newTweet } from '../../../api/Twitter/Twitter';

import './TweetWidgetContainer.css';

class TweetWidgetContainer extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            tweet: "",
            sent: "Send"
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (e) => {
        const {id, value} = e.target
        if (this._isMounted) {
            this.setState({tweet: value, sent: "Send"});
        }
    }

    handleClickSubmit = (e) => {
        this.setState({tweet: this.state.tweet, sent: "Sending"});
        e.preventDefault();
        newTweet(localStorage.getItem("TOKEN_TWITTER"), localStorage.getItem("SECRET_TWITTER"), this.state.tweet)
        .then((value) => {
        if (value) {
            this.setState({tweet: this.state.tweet, sent: "Success"});
            console.log("tweeted")
        } else {
            this.setState({tweet: this.state.tweet, sent: "Error"});
            console.log("not tweeted")
        }
        })
    }

    render() {
        return (
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan}>
                <div className="inputWidget">
                    <input type="tweet"
                        className="form-control"
                        id="tweet"
                        placeholder="Your tweet"
                        value={this.state.tweet}
                        onChange={this.handleChange}
                    />
                    <button type="submit"
                        className="btn btn-outline-success"
                        onClick={this.handleClickSubmit}
                    >
                        {this.state.sent}
                    </button>
                </div>
            </Widget>
        )
    }
}

export default TweetWidgetContainer;