##  rmc-pull-updown-to-refresh  [![Build Status](https://travis-ci.org/eightfeet/rmc-pull-updown-to-refresh.svg?branch=master)](https://travis-ci.org/eightfeet/rmc-pull-updown-to-refresh)
An accessible and easy component for ReactJS
### 简单易用的react拖拉翻页组件 

##  Installing
npm  
```sh
npm i rmc-pull-updown-to-refresh -S
```
yarn
```sh
yarn add rmc-pull-updown-to-refresh
```
##  Basic Example

```js
    import React, { Component } from 'react';
    import PullToRefresh from 'rmc-pull-updown-to-refresh';

    export default class YouComponet extends Component {
        onPullDown = () =>
            new Promise((res, rej) => {
            window.clearTimeout(this.time1);
            this.time1 = setTimeout(() => {
                this.setState(
                {
                    listleft: ['暂无数据'],
                },
                () => rej('接口请求失败'),
                );
            }, 3000);
            });

        onPullUp = () =>
            new Promise((res, rej) => {
            window.clearTimeout(this.time2);
            this.time2 = setTimeout(() => {
                rej('没有更多了！');
            }, 3000);
            });
        ...
        render () {
            return (
                <div>
                    <PullToRefresh
                        className={s.bg_orange}
                        onPullDown={this.onPullDown}
                        disablePullUp={false}
                        disablePullDown={false}
                        pullDownText="左下拉更新"
                        pullUpText="左上拉更新"
                        onPullUp={this.onPullUp}
                        loadBackground="#eee"
                        loadTextColor="#999"
                        loadIcon={loadheart}
                        pullIcon={rocket}
                    >
                        <ul>
                            <li>...youlist</li>
                            <li>...youlist</li>
                            <li>...youlist</li>
                            ...
                        </ul>
                    </PullToRefresh>
        }
    }

```

##  API
- ### onPullDown: () => Promise<any>      
下拉事件
```js
    onPullDown = () => new Promise((resove, reject) => {
        if (resove) {
            resove()
        }
        if (reject) {
            reject()
        }
    })
```
```js
    <PullToRefresh
        onPullDown={this.onPullDown}
    >
    </PullToRefresh>
```
	 
- ### onPullUp: () => Promise<any>  
上拉事件  
```js
    onPullUp = () => new Promise((resove, reject) => {
        if (resove) {
            resove()
        }
        if (reject) {
            reject()
        }
    })
```
```js
    <PullToRefresh
        onPullUp={this.onPullUp}
    >
    </PullToRefresh>
```
 
- ### disablePullUp: boolean   
禁用上拉事件  
```js
    <PullToRefresh
        disablePullUp
    >
    </PullToRefresh>
```
 
- ### disablePullDown: boolean   
禁用下拉事件   
```js
    <PullToRefresh
        disablePullDown
    >
    </PullToRefresh>
```
 
- ### pullDownText: string    
下拉状态提示文案   
```js
    <PullToRefresh
        pullDownText="pullDownText"
    >
    </PullToRefresh>
```

- ### pullUpText: string    
上拉状态提示文案   
```js
    <PullToRefresh
        pullUpText="pullUpText"
    >
    </PullToRefresh>
```

- ### loadBackground: string
下拉状态条背景色
```js
    <PullToRefresh
        loadBackground="#eee"
    >
    </PullToRefresh>
```

- ### loadTextColor: string
下拉状态条文字颜色
```js
    <PullToRefresh
        loadTextColor="#999"
        >
    </PullToRefresh>
```

- ### loadIcon: string
下拉条loading图标
```js
    import loadheart from'./../PullToRefresh/loadingheart.svg';
```
```js
    <PullToRefresh
        loadIcon={loadheart}
    >
    </PullToRefresh>
```

- ### loadIcon: string
下拉条下拉图标
```js
    import rocket from './../PullToRefresh/rocket.png';
```
```js
    <PullToRefresh
        pullIcon={rocket}
    >
    </PullToRefresh>
```

## Event flow
<img src="https://github.com/eightfeet/rmc-pull-updown-to-refresh/blob/master/src/components/PullToRefresh/flow.png?raw=true" width="500" />

## Demo
<div align="center">
    <img src="https://github.com/eightfeet/rmc-pull-updown-to-refresh/blob/master/src/components/PullToRefresh/example.gif?raw=true" width="300" />
    <br /> 
    手机扫码体验   
    <br />   <img src="https://github.com/eightfeet/rmc-pull-updown-to-refresh/blob/master/src/components/PullToRefresh/demo.png?raw=true" width="100" />  
</div>
