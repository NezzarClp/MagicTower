import React from 'react'
import PropTypes from 'prop-types';

import MazeActions from '../actions/MazeActions';

import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        onMoveLeftClick: () => {
            dispatch(MazeActions.characterWalks(-1, 0));
        },
        onMoveUpClick: () => {
            dispatch(MazeActions.characterWalks(0, -1));
        },
        onMoveRightClick: () => {
            dispatch(MazeActions.characterWalks(1, 0));
        },
        onMoveDownClick: () => {
            dispatch(MazeActions.characterWalks(0, 1));
        }
    }
}

export class ControlPanel extends React.Component {

    static propTypes = {
        /**
         * Fired when left button is clicked
         */
        onMoveLeftClick: PropTypes.func,

        /**
         * Fired when top button is clicked
         */
        onMoveUpClick: PropTypes.func,

        /**
         * Fired when right button is clicked
         */
        onMoveRightClick: PropTypes.func,

        /**
         * Fired when left button is clicked
         */
        onMoveDownClick: PropTypes.func,
    };

    render() {
        const {
            onMoveLeftClick,
            onMoveUpClick,
            onMoveRightClick,
            onMoveDownClick,
        } = this.props;

        return (
            <div className="panel--control">
                <button
                    style={{'backgroundColor': 'yellow'}}
                    onClick={onMoveLeftClick}
                />
                <button
                    style={{'backgroundColor': 'yellow'}}
                    onClick={onMoveUpClick}
                />
                <button
                    style={{'backgroundColor': 'yellow'}}
                    onClick={onMoveRightClick}
                />
                <button
                    style={{'backgroundColor': 'yellow'}}
                    onClick={onMoveDownClick}
                />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(ControlPanel);
