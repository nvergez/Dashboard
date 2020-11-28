import React, { Component } from 'react';
import Widget from '../Widget';

import { getChannelStats } from '../../../api/Youtube/Youtube';

import './ChannelSubsWidget.css'

class ChannelSubsWidget extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            id: "",
            title: "",
            subs: "",
            exists: false,
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
            this.setState({id: value})
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        getChannelStats(this.state.id)
        .then((value) => {
            if (value.wrongId) {
                this.setState({received: true, exists: false})
            } else {
                this.setState({received: true, exists: true, title: value.channel, subs: value.statistics.subscriberCount})
            }
            this.forceUpdate();
        })
    }

    showData() {
        if (!this.state.received) {
            return (<div className="result">
                </div>)
        }
        if (!this.state.exists) {
            return (<div className="result">
                This channel doesn't exist.
                </div>)
        } else {
            return (<div className="result">
                The channel {this.state.title} has {this.state.subs} subscribers.
                </div>)
        }
    }

    render() {
        return (
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan}>
                <div className="inputId">
                    <input type="id"
                        className="form-control"
                        id="id"
                        placeholder="Type a channel ID"
                        value={this.state.id}
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

export default ChannelSubsWidget;