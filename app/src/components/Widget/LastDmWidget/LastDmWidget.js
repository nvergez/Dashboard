import React, { Component } from 'react';
import Widget from '../Widget';

import { getLastDm } from '../../../api/Twitter/Twitter';

import './LastDmWidget.css';

class LasDmWidget extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            value: "",
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
        return getLastDm(localStorage.getItem("TOKEN_TWITTER"), localStorage.getItem("SECRET_TWITTER"))
        .then((value) => {
            if (this._isMounted) {
                if (value)
                    this.setState({value: value, loading: false});
                else
                    this.setState({value: "null", loading: false});
            }
        })
    }

    render() {
        return (
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} >
                <div className="LastDm">
                    {this.state.value}
                </div>
            </Widget>
        )
    }
}

export default LasDmWidget;