import React from 'react';
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import './App.css';

const onPullDown = () =>
new Promise((res, rej) => {
setTimeout(() => {
    rej('没有更多了！');
}, 3000);
});

function App() {
  return (
    <div className="App">
      <div>
      <PullToRefresh className='11' loadingClassName="bgtest" pullIcon={<>aaa</>} loadIcon={<>d</>} onPullUp={onPullDown} onPullDown={onPullDown} pullDownText='下拉刷新'>
        aaaa
      </PullToRefresh>
      </div>
    </div>
  );
}

export default App;