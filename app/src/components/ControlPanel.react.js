import React from 'react'
import PropTypes from 'prop-types';

import MazeActions from '../actions/MazeActions';

import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        onMoveLeftClick: () => {
            dispatch(MazeActions.MovetoLeft());
        }
    }
}

export class ControlPanel extends React.Component {

    static propTypes = {
        onMoveLeftClick: PropTypes.function,
    };

    render() {
        const { onMoveLeftClick } = this.props;

        return (
            <button
                style={{'background-color': 'yellow'}}
                onClick={onMoveLeftClick}
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(ControlPanel);
