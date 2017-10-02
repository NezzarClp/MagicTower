import React from 'react'
import PropTypes from 'prop-types';

// TODO replace floor.png with character
import character from '../images/floor.png';

export default class CharacterCell extends React.Component {

    static propTypes = {
        /**
         * The 0-based x-coordinate of the cell, from left to right
         */
        x: PropTypes.number.isRequired,

        /**
         * The 0-based y-coordinate of the cell, from top to bottom
         */
        y: PropTypes.number.isRequired,
    };

    _getPositionStyle() {
        const { x, y } = this.props;
        const width = 60;

        return {
            position: 'absolute',
            top: `${y*width}px`,
            left: `${x*width}px`,
        };
    }

    _getCharacterStyle() {
        return {
            top: 0,
            left: 0,
            width: '30px',
            height: '30px',
            'zIndex': 1,
        };
    }

    _getCharacterSrc() {
        return character;
    }

    render() {
        const positionStyle = this._getPositionStyle();
        const characterStyle = this._getCharacterStyle();

        return (
            <div className='grid__cell' style={positionStyle}>
                <img
                    alt=''
                    className='grid__cell__img'
                    style={characterStyle}
                    src={this._getCharacterSrc()}
                />
            </div>
        );
    }
}
