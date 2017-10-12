import React from 'react'
import PropTypes from 'prop-types';

export default class NumberField extends React.Component {
    static PropTypes = {
        /**
         * The number displayed on the field
         */
        number: PropTypes.number,
    };

    static defaultProps = {
        number: 0,
    };

    render() {
        const { number } = this.props;
        return (
            <div className="number-field">
                <div className="number-field__inner-text">
                    {number}
                </div>
            </div>
        );
    }
}
