import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import {ai} from './TelemetryService';

class TelemetryProvider extends Component {
    static propTypes = {
        children: PropTypes.any,
        after: PropTypes.func,
        connectionString: PropTypes.string
    }
    state = {
        initialized: false
    };

    componentDidMount() {
        const {initialized} = this.state;
        const AppInsightsConnectionString = this.props.connectionString;

        if (!initialized && AppInsightsConnectionString) {
            ai.initialize(AppInsightsConnectionString);
            this.setState({initialized: true});
        }

        this.props.after();
    }

    render() {
        const {children} = this.props;
        return (
            <Fragment>
                {children}
            </Fragment>
        );
    }
}

export default withAITracking(ai.reactPlugin, TelemetryProvider)