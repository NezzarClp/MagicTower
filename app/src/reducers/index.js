import { combineReducers } from 'redux';

import maze from './maze.js';
import message from './message.js';

export default combineReducers({
    maze,
    message,
});
