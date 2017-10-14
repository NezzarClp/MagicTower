import React from 'react'

import NumberField from './NumberField.react';

export default class StatPanel extends React.Component {

    render() {
        return (
            <div className="panel--stat">
                <div>
                    <NumberField number={3} />
                    <NumberField number={3} />
                    <NumberField number={3} />
                </div>
                <div className="panel--stat__groupped">
                    <NumberField number={3} />
                    <NumberField number={3} />
                </div>
                <div className="panel--stat__groupped">
                    <NumberField number={3} />
                    <NumberField number={3} />
                </div>
            </div>
        );
    }
}
