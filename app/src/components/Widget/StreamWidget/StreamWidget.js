import React, { Component } from 'react';
import Widget from '../Widget';

import { getStreambyName } from '../../../api/Twitch/Twitch';

import './StreamWidget.css';

class StreamWidget extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            name: "",
            streamer: "",
            viewers: "",
            game: "",
            offline: true,
            received: false
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
            this.setState({name: value})
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        getStreambyName(localStorage.getItem("TOKEN_TWITCH"), this.state.name)
        .then((value) => {
            if (value.offline) {
                this.setState({streamer: this.state.name, offline: true, received: true})
            } else {
                this.setState({streamer: this.state.name, game: value.game_name, viewers: value.viewer_count, received:true, offline:false})
            }
            this.forceUpdate();
        })
    }

    showData() {
        if (localStorage.getItem("TOKEN_TWITCH")) {
            if (!this.state.received) {
                return (<div className="result">
                </div>)
            }
            if (this.state.offline) {
                return (<div className="result">
                    {this.state.streamer} is offline.
                    </div>)
            } else {
                return (<div className="result">
                    {this.state.streamer} is online with {this.state.viewers} viewers on {this.state.game}.
                    </div>)
            }
        } else {
            return (<div className="result">
                Please, connect your twitch account.
                </div>)
        }
    }

    render() {
        return (
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan}>
                <div className="inputName">
                    <input type="username"
                        className="form-control"
                        id="username"
                        placeholder="Type a channel name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <button type="submit"
                        className="btn btn-outline-success"
                        onClick={this.handleClick}
                    >
                        Search
                    </button>
                </div>
                {this.showData()}
            </Widget>
        )
    }
}

export default StreamWidget;