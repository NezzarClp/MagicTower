import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import MazeActions from './actions/MazeActions';

import MazeAPI from './API/MazeAPI';

import ControlPanel from './components/ControlPanel.react';
import Grid from './components/Grid.react';

function mapDispatchToProps(dispatch) {
    return {
        initialzeMapTiles: (mazeTileDetails) => {
            dispatch(MazeActions.initialzeMapTiles(mazeTileDetails));
        }
    }
}

export class App extends React.Component {

    static propTypes = {

        /**
         * Function to be called when map tiles are ready
         */
        initialzeMapTiles: PropTypes.func,
    }

    _initializeApp() {
        const { initialzeMapTiles } = this.props;
        MazeAPI.readMazeTiles()
            .then((mazeTileDetails) => {
                initialzeMapTiles(mazeTileDetails);
            });
    }

    componentDidMount() {
        this._initializeApp();
    }

    render() {
        return (
            <div className="App">
                <Grid />
                <ControlPanel />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(App);
