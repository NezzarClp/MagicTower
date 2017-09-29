import React from 'react'

import GridCell from './GridCell.react';

export default class Grid extends React.Component {
    render() {
        return (
            <div>
            <GridCell x={0} y={0} cellType={'wall'}/>
            <GridCell x={1} y={0} cellType={'wall'}/>
            <GridCell x={0} y={1} cellType={'wall'}/>
            <GridCell x={1} y={1} cellType={'floor'}/>
            </div>
        );
    }
}
