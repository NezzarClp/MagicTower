import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MazeActions from './actions/MazeActions';

import CharacterAPI from './apis/CharacterAPI';
import MazeAPI from './apis/MazeAPI';

import Grid from './components/Grid.react';
import MessageBox from './components/MessageBox.react';
import Panel from './components/Panel.react';
import KeyboardInput from './components/KeyboardInput.react';

function mapDispatchToProps(dispatch) {
    return {
        initializeCharacter: (character) => {
            dispatch(MazeActions.initializeCharacter(character));
        },
        initializeMap: (mazeDetails) => {
            dispatch(MazeActions.initializeMap(mazeDetails));
        },
    }
}

export class App extends React.Component {

    static propTypes = {
        /**
         * Function to be called when character data is ready
         */
        initializeCharacter: PropTypes.func,

        /**
         * Function to be called when map tiles are ready
         */
        initializeMap: PropTypes.func,
    }

    _initializeApp() {
        const {
            initializeCharacter,
            initializeMap,
        } = this.props;
        MazeAPI.readMazeTiles()
            .then((mazeDetails) => {
                initializeMap(mazeDetails);
            });
        CharacterAPI.readCharacter()
            .then((character) => {
                initializeCharacter(character);
            })
    }

    componentDidMount() {
        this._initializeApp();
    }

    render() {
        return (
            <div>
                <div className="App" style={{
                    margin: '8px',
                }}>
                    <div style={{
                        display: 'flex',
                    }}>
                        <Grid />
                        <Panel />
                    </div>
                    <MessageBox />
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
