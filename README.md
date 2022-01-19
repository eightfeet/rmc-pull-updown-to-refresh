# rmc-pull-updown-to-refresh  

An accessible and easy component for ReactJS

### 简单易用的react拖拉翻页组件 

灵活自由，高度可配置， 支持局部滚动。

# Installing

npm  
```sh
npm i rmc-pull-updown-to-refresh -S
```
yarn
```sh
yarn add rmc-pull-updown-to-refresh
```

# Server

##  [Example repo](https://github.com/eightfeet/rmc-pull-updown-to-refresh/tree/master/example)
```ssh
git clone https://github.com/eightfeet/rmc-pull-updown-to-refresh.github
cd rmc-pull-updown-to-refresh
npm install
npm run build

cd example npm install
npm run start

```

```js
import React, { useCallback, useState } from 'react';
import PullToRefresh from 'rmc-pull-updown-to-refresh';

function App() {
    const [list, setList] = useState<number[]>([1,2,3,4,5]);

    const onPullDown = useCallback(
        () =>
            new Promise((res, rej) => {
                setTimeout(() => {
                    rej('暂无数据');
                    setList([]);
                }, 3000);
            }),
        []
    );

    const onPullUp = useCallback(
        () =>
            new Promise((res, rej) => {
                setTimeout(() => {
                    if (list?.length < 30) {
                        setList((data) => {
                            const newData = [...data];
                            for (
                                let index = list.length;
                                index < list.length + 15;
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
        [list]
    );

    return (
        <div className="App">
            <div className="wrap">
                <PullToRefresh
                    className="list"
                    loadingClassName="background"
                    onPullUp={onPullUp}
                    onPullDown={onPullDown}
                    pullDownText={
                        <div className="pulldowntext">下拉刷新</div>
                    }
                    loadingText={'请稍候'}
                >
                    {list.map((item) => (
                        <div className="item" key={item}>{item}</div>
                    ))}
                    {list.length ? null : <div className='none'>找不到数据</div>}
                </PullToRefresh>
            </div>
        </div>
    );
}

export default App;


```

# Api

```typescript
interface Props {
    disablePullDown?: boolean; // 禁止下拉
    disablePullUp?: boolean; // 禁止上拉
    pullDownText?: React.ReactNode; // 下拉时展示的文本
    pullUpText?: React.ReactNode; // 上拉时展示的文本
    onPullUp: () => Promise<any>; // 上拉方法，要求返回promise，reject返回错误信息
    onPullDown: () => Promise<any>; // 下拉方法，要求返回promise，reject返回错误信息
    className: string; //样式
    children: React.ReactNode; 
    loadingClassName?: string; // 加载条样式
    loadIcon?: React.ReactNode; // 加载图标
    loadingText?: React.ReactNode; // 加载文本
    pullIcon?: React.ReactNode; // 拉动时方向图标
}
```

# ⚠️ 注意
rmc-pull-updown-to-refresh  根据父级高度来定义滚动视窗高度，组件初始化前请定义好父级HTML元素高度，如果获取不到父级HTML元素高度，滚动视窗高度高度将被设置为浏览器窗口高度


# 事件流 Event flow
<img src="https://www.eightfeet.cn/rmc-pull-updown-to-refresh/flow.png" width="500" />

## Demo
<div align="center">
    <img src="https://www.eightfeet.cn/rmc-pull-updown-to-refresh/example.gif" width="300" />
    <br /> 
    手机扫码体验   
    <br />   <img src="https://www.eightfeet.cn/rmc-pull-updown-to-refresh/demo.png" width="100" />  
</div>
