import React, { useCallback, useState } from 'react';
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import EffectLoading from './EffectLoading';

function App() {
    const [listA, setListA] = useState<number[]>([0,1,2,3,4]);
    const [listB, setListB] = useState<number[]>([0,1,2,3,4,5]);

    const onPullDown = useCallback(
        (tag: string) => () =>
            new Promise((res, rej) => {
                setTimeout(() => {
                    rej('暂无数据');
                    tag === '左边' ? setListA([]) : setListB([]);
                }, 3000);
            }),
        []
    );

    const onPullUp = useCallback(
        (tag: string) => () =>
            new Promise((res, rej) => {
                const list = tag === '左边' ? listA : listB;
                const fn = tag === '左边' ? setListA : setListB;
                setTimeout(() => {
                    if (list?.length < 20) {
                        fn((data) => {
                            const newData = [...data];
                            for (
                                let index = list.length;
                                index < list.length + 10;
                                index++
                            ) {
                                newData.push(index);
                            }
                            return newData;
                        });
                        res(null);
                    } else {
                        rej('别扯了!这是底线');
                    }
                }, 3000);
            }),
        [listA, listB]
    );

    return (
        <div className="App">
            <div className="wrap">
                <PullToRefresh
                    className="list"
                    loadingClassName="background"
                    onPullUp={onPullUp('左边')}
                    onPullDown={onPullDown('左边')}
                    pullDownText={
                        <div className="pulldowntext">左-下拉刷新</div>
                    }
                    loadingText={null}
                    loadIcon={<div className='effectloading'><EffectLoading /></div>}
                >
                    {listA.map((item) => (
                        <div className="item" key={item}>{item}</div>
                    ))}
                    {listA.length ? null : <div className='none'>找不到数据</div>}
                </PullToRefresh>
                <PullToRefresh
                    className="listb"
                    loadingClassName="background"
                    onPullUp={onPullUp('右边')}
                    onPullDown={onPullDown('右边')}
                    pullDownText={
                        <div className="pulldowntext">右-下拉刷新</div>
                    }
                    loadingText={'请稍后'}
                >
                    {listB.map((item) => (
                        <div className="item" key={item}>{item}</div>
                    ))}
                    {listB.length ? null : <div className='none'>找不到数据</div>}
                </PullToRefresh>
            </div>
        </div>
    );
}

export default App;
