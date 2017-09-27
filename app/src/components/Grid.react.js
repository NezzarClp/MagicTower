import React from 'react'

import GridCell from './GridCell.react';

export default class Grid extends React.Component {
    render() {
        return (
            <div>
            <GridCell />
            <GridCell />
            </div>
        );
    }
}