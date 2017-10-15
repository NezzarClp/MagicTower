import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MazeActions from './actions/MazeActions';

import MazeAPI from './apis/MazeAPI';

import ControlPanel from './components/ControlPanel.react';
import Grid from './components/Grid.react';
import KeyboardInput from './components/KeyboardInput.react';

function mapDispatchToProps(dispatch) {
    return {
        initialzeMap: (mazeDetails) => {
            dispatch(MazeActions.initialzeMap(mazeDetails));
        }
    }
}

export class App extends React.Component {

    static propTypes = {

        /**
         * Function to be called when map tiles are ready
         */
        initialzeMap: PropTypes.func,
    }

    _initializeApp() {
        const { initialzeMap } = this.props;
        MazeAPI.readMazeTiles()
            .then((mazeDetails) => {
                initialzeMap(mazeDetails);
            });
    }

    componentDidMount() {
        this._initializeApp();
    }

    render() {
        return (
            <div>
                <div className="App" style={{
                    display: 'flex',
                    margin: '8px',
                }}>
                    <Grid />
                    <ControlPanel />
                </div>
                <div>
                    <KeyboardInput
                        keyMaps={{
                            37: {
                                func: MazeActions.moveCharacter,
                                param: [0, -1],
                            },
                            38: {
                                func: MazeActions.moveCharacter,
                                param: [-1, 0],
                            },
                            39: {
                                func: MazeActions.moveCharacter,
                                param: [0, 1],
                            },
                            40: {
                                func: MazeActions.moveCharacter,
                                param: [1, 0],
                            },
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(App);
