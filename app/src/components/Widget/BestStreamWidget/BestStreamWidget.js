import React, { Component } from 'react';
import Widget from '../Widget';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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
            scope: "en",
            loading: true
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData().then(_ => {
            this.interval = setInterval(this.getData, 10000);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData() {
        return getBestStream(localStorage.getItem("TOKEN_TWITCH"), this.state.scope)
        .then((value) => {
            if (this._isMounted) {
                this.setState({streamer: value.user_name, game: value.game_name, viewers: value.viewer_count, loading: false, scope: this.state.scope});
            }
        })
    }

    handleChange = (e) => {
        if (this._isMounted) {
            this.setState({streamer: this.state.streamer, game: this.state.game, viewers: this.state.viewers, loading: true, scope: e});
        }
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
                <ToggleButtonGroup type="radio" name="options" defaultValue={"en"} size='sm' onChange={this.handleChange}>
                    <ToggleButton value={"en"}>Worldwide </ToggleButton>
                    <ToggleButton value={"fr"}>France</ToggleButton>
                </ToggleButtonGroup>
                {this.showData()}
            </Widget>
        )
    }
}

export default BestStreamWidget;