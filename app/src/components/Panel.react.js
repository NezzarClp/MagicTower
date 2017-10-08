import React from 'react'

import ControlPanel from './ControlPanel.react';
import StatPanel from './StatPanel.react';

export default class Panel extends React.Component {

    static propTypes = {
    };

    render() {
        return (
            <div className="panel">
                <StatPanel />
                <ControlPanel />
            </div>
        );
    }
}
