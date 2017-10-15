import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import AppConstants from '../constants/AppConstants';

function mapDispatchToProps(dispatch) {
    return {
        /**
         * Dispatch action as input
         * @param {Function} keyMapFunction   Action creator
         * @param {Array}    keyMapParameters Array of parameters of the action creator
         */
        onKeyClick: (keyMapFunction, keyMapParameters) => {
            dispatch(keyMapFunction( ...keyMapParameters ));
        }
    }
}

export class KeyboardInput extends React.Component {
    static propTypes = {
        /**
         * A mapping from key code to action creator and parameters
         */
        keyMaps: PropTypes.object,

        /**
         * Function to dispatch correct actions based on the key clicked
         */
        onKeyClick: PropTypes.func,
    };

    static defaultProps = {
        onKeyClick: AppConstants.emptyFunction,
    };

    componentWillMount() {
        const {
            keyMaps,
            onKeyClick,
        } = this.props;

        this._addNewKeyMaps(keyMaps, onKeyClick);
    }

    componentWillReceiveProps(prevProps, nextProps) {
        const {
            keyMaps: prevKeyMaps,
            onKeyClick,
        } = prevProps;
        const {
            keyMaps: nextKeyMaps,
        } = nextProps;

        this._removeOldKeyMaps(prevKeyMaps, onKeyClick);
        this._addNewKeyMaps(nextKeyMaps, onKeyClick);
    }

    componentWillUnmount() {
        const {
            keyMaps,
            onKeyClick,
        } = this.props;

        this._removeOldKeyMaps(keyMaps, onKeyClick);
    }

    _addNewKeyMaps(keyMaps, onKeyClick) {
        for (let keyMap in keyMaps) {
            const keyMapFunction = keyMaps[keyMap].func;
            const keyMapParameters = keyMaps[keyMap].param;
            window.addEventListener("keydown", (e) => {
                if (e.keyCode.toString() === keyMap) {
                    onKeyClick(keyMapFunction, keyMapParameters);
                }
            });
        }
    }

    _removeOldKeyMaps(keyMaps, onKeyClick) {
        for (let keyMap in keyMaps) {
            const keyMapFunction = keyMaps[keyMap].func;
            const keyMapParameters = keyMaps[keyMap].param;
            window.removeEventListener("keydown", (e) => {
                if (e.keyCode.toString() === keyMap) {
                    onKeyClick(keyMapFunction, keyMapParameters);
                }
            });
        }
    }

    render() {
        return null;
    }
}

export default connect(null, mapDispatchToProps)(KeyboardInput);
