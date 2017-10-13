import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        displayText: state.message.displayText,
    };
}

export class MessageBox extends React.Component {
    static PropTypes = {
        /**
         * The string displayed
         */
        displayText: PropTypes.string,
    };

    static defaultProps = {
        displayText: '',
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

export default connect(mapStateToProps)(MessageBox);
