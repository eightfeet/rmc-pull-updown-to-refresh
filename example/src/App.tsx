import React from 'react';
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{height: '100vh'}}>
      <PullToRefresh className='11' onPullUp={() => Promise.resolve} onPullDown={Promise.resolve}>
        aaaa
      </PullToRefresh>
      </div>
    </div>
  );
}

export default App;