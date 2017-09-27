import React from 'react'

import wall from '../images/wall.png';

export default class GridCell extends React.Component {
    render() {
        return (
            <div className='grid__cell'>
                <img className='grid__cell__img' alt='' src={wall} />
            </div>
        );
    }
}