##  rmc-pull-updown-to-refresh  

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

##  Example
```ssh
git clone https://github.com/eightfeet/rmc-pull-updown-to-refresh.github
cd rmc-pull-updown-to-refresh
npm install
npm run build

cd example npm install
npm run start

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
                        loadIcon={loadheart}
                        pullIcon={rocket}
                        loadingClassName={}
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

```typescript
    interface Props {
        disablePullDown?: boolean;
        disablePullUp?: boolean;
        pullDownText?: React.ReactNode;
        pullUpText?: React.ReactNode;
        onPullUp: () => Promise<any>;
        onPullDown: () => Promise<any>;
        className: string;
        children: React.ReactNode;
        loadingClassName?: string;
        loadIcon?: React.ReactNode;
        pullIcon?: React.ReactNode;
    }
    interface State {
        debug?: string | null;
        rootHeight: number;
        transfrom: number | null;
        loadingtext?: React.ReactNode;
        showLoading: boolean;
        showArrow: boolean;
        arrowRotate: number;
        errMsg: string | null;
    }
    export default class PullToRefresh extends Component<Props, State> {
        static defaultProps: {
            pullDownText: string;
            pullUpText: string;
            loadingClassName: string;
            loadIcon: JSX.Element;
            pullIcon: JSX.Element;
        };
        rootbox: HTMLDivElement | null;
        drogbox: HTMLDivElement | null;
        listwrap: HTMLDivElement | null;
        listcontent: HTMLDivElement | null;
        offset: number;
        startPos: number;
        endPos: number;
        startXPos: number;
        endXPos: number;
        originTransfrom: number;
        isTouch: boolean;
        isScroll: boolean;
        minDistance: number;
        step: number;
        timererror: number | undefined;
        delaytimer: number | undefined;
        isStatusLoading: boolean;
        distence: number;
        initialDirection: number | null;
        pageHeight: any;
        constructor(props: Props);
        componentDidMount(): void;
        componentWillUnmount(): void;
        init: () => void;
        stateInit: () => void;
        isOnScroll: () => boolean;
        onScroll: () => void;
        onAddTouchEventListener: () => void;
        onRemoveTouchEventListener: () => void;
        onTouchStart: (event: any) => void;
        onTouchMove: (event: any) => void;
        onTouchEnd: (event: any) => boolean;
        handleAction: (direction: number) => Promise<string | void>;
        render(): JSX.Element;
    }
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
