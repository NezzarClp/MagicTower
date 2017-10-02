import React from 'react';

import ControlPanel from './components/ControlPanel.react';
import Grid from './components/Grid.react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid
            numRows={4}
            numColumns={4}
        />
        <ControlPanel />
      </div>
    );
  }
}

export default App;
