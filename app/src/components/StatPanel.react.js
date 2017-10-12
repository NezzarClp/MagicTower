import React from 'react'

import NumberField from './NumberField.react';

export default class StatPanel extends React.Component {

    render() {
        return (
            <div className="panel--stat">
                <NumberField number={3} />
                <NumberField number={3} />
                <NumberField number={3} />
            </div>
        );
    }
}
