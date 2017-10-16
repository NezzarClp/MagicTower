import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import NumberField from './NumberField.react';

function mapStateToProps(state) {
    return {
        character: state.maze.character,
    };
}

export class StatPanel extends React.Component {
    static propTypes = {
        /**
         * The character Object
         */
        character: PropTypes.object,
    }

    render() {
        const { character } = this.props;

        return (
            <div className="panel--stat">
                <div>
                    <NumberField number={character.attack} />
                    <NumberField number={character.defend} />
                    <NumberField number={character.hitPoint} />
                </div>
                <div className="panel--stat__groupped">
                    <NumberField number={character.yellowKey} />
                    <NumberField number={3} />
                </div>
                <div className="panel--stat__groupped">
                    <NumberField number={3} />
                    <NumberField number={3} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(StatPanel);
