import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Promise from 'bluebird';

import UIConstants from '../../constants/UIConstants';

export default class GridCell extends React.PureComponent {

    static propTypes = {
        /**
         * The 0-based x-coordinate of the cell, from left to right
         */
        column: PropTypes.number.isRequired,

        /**
         * The 0-based y-coordinate of the cell, from top to bottom
         */
        row: PropTypes.number.isRequired,
        
        /**
         * src of the image displaying
         */
        src: PropTypes.string,
        
        /**
         * Additional classnames
         */
        classNames: PropTypes.array,
        
        /**
         * True if the image is gif
         */
        gif: PropTypes.bool,
    };
    
    static defaultProps = {
        classNames: [],
        gif: false,
    };

    _getPositionStyle() {
        const { row, column } = this.props;
        const { cellWidth } = UIConstants;

        return {
            top: `${row*cellWidth}px`,
            left: `${column*cellWidth}px`,
        };
    }

    render() {
        const { src } = this.props;
        const positionStyle = this._getPositionStyle();
        const className = classNames('grid__cell', this.props.classNames);
        let img;
        
        img = (
            <img 
                className='grid__cell__img' 
                alt='' 
                src={src}
            />
        );

        return (
            <div className={className} style={positionStyle}>
                {img}
            </div>
        );
    }
}