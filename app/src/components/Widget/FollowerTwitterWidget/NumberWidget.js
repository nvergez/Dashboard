import React, { Component } from 'react';

import Widget from '../Widget';
import NumberDisplay from './NumberDisplay';

import './NumberWidget.css';

class NumberWidget extends Component {
    render() {
        return (
            <Widget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} loading={this.props.loading}>
                <div className="NumberWidget">
                    <NumberDisplay value={this.props.value} />
                </div>
            </Widget>
        )
    }
}

export default NumberWidget;