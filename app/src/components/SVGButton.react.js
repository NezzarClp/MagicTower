import React from 'react'
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';

import AppConstants from '../constants/AppConstants';

export default class SVGButton extends React.Component {
    static propTypes = {
        /**
         * source of the svg button
         */
        src: PropTypes.string,
        
        /**
         * Callback function to be fired when the button is clicked
         */
        onClick: PropTypes.func,
    };
    
    static defaultProps = {
        onClick: AppConstants.emptyFunction,
    };
    
    render() {
        return null;
    }
}