import React from 'react'
import PropTypes from 'prop-types';

export default class MessageBox extends React.Component {
    static PropTypes = {
        /**
         * The string displayed
         */
        displayText: PropTypes.string
    };

    static defaultProps = {
        displayText: 'Hello',
    };

    render() {
        const { displayText } = this.props;
        return (
            <div className="message-box">
                <div className="message-box__inner">
                    {displayText}
                </div>
            </div>
        );
    }
}
