import React, { Component } from 'react';

import NumberWidget from './NumberWidget';

import { getFollowersCount } from '../../../api/Twitter/Twitter';

class NumberWidgetContainer extends Component {
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
            this.interval = setInterval(this.getData, 180000);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData() {
        return getFollowersCount(localStorage.getItem("TOKEN_TWITTER"), localStorage.getItem("SECRET_TWITTER"))
        .then((value) => {
            if (this._isMounted) {
                if (value)
                    this.setState({value: value, loading: false});
                else
                    this.setState({value: -1, loading: false});
            }
        })
    }

    render() {
        return (
            <NumberWidget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} value={this.state.value} loading={this.state.loading}/>
        )
    }
}

export default NumberWidgetContainer;