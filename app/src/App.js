import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MazeActions from './actions/MazeActions';

import CharacterAPI from './apis/CharacterAPI';
import MazeAPI from './apis/MazeAPI';

import Grid from './components/Grid.react';
import MessageBox from './components/MessageBox.react';
import Panel from './components/Panel.react';

function mapDispatchToProps(dispatch) {
    return {
        initializeCharacter: (character) => {
            dispatch(MazeActions.initializeCharacter(character));
        },
        initialzeMap: (mazeDetails) => {
            dispatch(MazeActions.initialzeMap(mazeDetails));
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
        initialzeMap: PropTypes.func,
    }

    _initializeApp() {
        const {
            initializeCharacter,
            initialzeMap,
        } = this.props;
        MazeAPI.readMazeTiles()
            .then((mazeDetails) => {
                initialzeMap(mazeDetails);
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
        );
    }
}

export default connect(null, mapDispatchToProps)(App);
