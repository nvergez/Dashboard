import React, { Component } from 'react';
import Widget from '../Widget';

import { getTwitchViews } from '../../../api/Twitch/Twitch';

import './ViewsTwitchWidget.css';

class ViewsTwitchWidget extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            value: undefined,
            loading: true
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData().then(_ => {
            this.interval = setInterval(this.getData, 360000);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData() {
        return getTwitchViews(localStorage.getItem("TOKEN_TWITCH"))
        .then((value) => {
            if (this._isMounted) {
                if (value !== undefined)
                    this.setState({value: value, loading: false});
                else
                    this.setState({value: -1, loading: false});
            }
        })
    }

    showData() {
        if (localStorage.getItem("TOKEN_TWITCH")) {
            return (<div className="views">
                {this.state.value}
                </div>)
        } else {
            return (<div className="pending">
                Please, connect your twitch account.
                </div>)
        }
    }

    render() {
        return (
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} >
                <div className="views">
                    {this.showData()}
                </div>
            </Widget>
        )
    }
}

export default ViewsTwitchWidget