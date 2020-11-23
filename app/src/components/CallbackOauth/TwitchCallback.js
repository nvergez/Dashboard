import React from 'react';
import { withRouter } from 'react-router-dom';
import url from 'url';

function TwitchCallback(props) {
    var new_url = props.url.replace("#", "?");
    var token = url.parse(new_url, true).query.access_token
    if (token) {
        localStorage.setItem("TOKEN_TWITCH", token)
    }
    props.updateTitle('Home')
    props.history.push('/home');

    return (
        <p>Loading ...</p>
    )
}

export default withRouter(TwitchCallback)