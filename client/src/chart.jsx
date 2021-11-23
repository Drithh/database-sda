import React, { Component } from 'react';
import * as d3 from 'd3';

export class Chart extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        let accessToRef = d3.select(this.myRef.current);
        accessToRef.style("background-color", "red");
    }

    render() {
        return (
            <div ref={this.myRef}>
                Testing
            </div>
        );
    }
}

export default Chart;