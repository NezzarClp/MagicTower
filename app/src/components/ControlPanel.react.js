import React from 'react'
import PropTypes from 'prop-types';

import MazeActions from '../actions/MazeActions';

import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        onMoveLeftClick: () => {
            dispatch(MazeActions.movetoLeft());
        }
    }
}

export class ControlPanel extends React.Component {

    static propTypes = {
        onMoveLeftClick: PropTypes.func,
    };

    render() {
        const { onMoveLeftClick } = this.props;

        return (
            <button
                style={{'backgroundColor': 'yellow'}}
                onClick={onMoveLeftClick}
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(ControlPanel);
