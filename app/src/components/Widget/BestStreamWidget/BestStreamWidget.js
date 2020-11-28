import React, { Component } from 'react';
import Widget from '../Widget';

import { getBestStream } from '../../../api/Twitch/Twitch';

import './BestStreamWidget.css';

class BestStreamWidget extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            streamer: "",
            game: "",
            viewers: "",
            loading: true
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData().then(_ => {
            this.interval = setInterval(this.getData, 15000);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData() {
        return getBestStream(localStorage.getItem("TOKEN_TWITCH"))
        .then((value) => {
            if (this._isMounted) {
                this.setState({streamer: value.user_name, game: value.game_name, viewers: value.viewer_count, loading: false});
            }
        })
    }

    showData() {
        if (localStorage.getItem("TOKEN_TWITCH")) {
            return (<div className="stream">
                It's {this.state.streamer} with {this.state.viewers} viewers on {this.state.game}.
                </div>)
        } else {
            return (<div className="stream">
                Please, connect your twitch account.
                </div>)
        }
    }

    render() {
        return (
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} >
                {this.showData()}
            </Widget>
        )
    }
}

export default BestStreamWidget;