import React, { Component } from 'react';
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
export {};
