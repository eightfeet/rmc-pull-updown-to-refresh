import React, { Component } from 'react';
import { slope } from './helper';
import s from './PullToRefresh.scss';

const loading = <span className={s.loadingico}><svg
    className="lds-palette-ring"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
>
    <g transform="rotate(150 50 50)">
        <path
            d="M80 50a30 30 0 0 1-20.73 28.532"
            fill="none"
            stroke="#ffffcb"
            strokeWidth={10}
        />
        <path
            d="M59.27 78.532a30 30 0 0 1-33.54-10.898"
            fill="none"
            stroke="#fac090"
            strokeWidth={10}
        />
        <path
            d="M25.73 67.634a30 30 0 0 1 0-35.268"
            fill="none"
            stroke="#ff7c81"
            strokeWidth={10}
        />
        <path
            d="M25.73 32.366a30 30 0 0 1 33.54-10.898"
            fill="none"
            stroke="#c0f6d2"
            strokeWidth={10}
        />
        <path
            d="M59.27 21.468A30 30 0 0 1 80 50"
            fill="none"
            stroke="#dae4bf"
            strokeWidth={10}
        />
        <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;360 50 50"
            dur={1}
            repeatCount="indefinite"
        />
    </g>
</svg></span>

const arrow = <span className={s.arrowico}><svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-359 361 80 80"
    xmlSpace="preserve"
>
    <path
        d="M-322.2 373.6c-12.6 1.4-22.7 11.5-24.2 24.1-1.5 12.8 5.7 24.1 16.6 28.8 0-2.5-1.2-4.9-3.2-6.4-6.6-4.9-10.5-13.1-9.3-22.2 1.4-10.6 10.1-19.1 20.7-20.3 14.2-1.6 26.3 9.6 26.3 23.5 0 12.4-9.5 22.5-21.6 23.5v-30l3.4 3.4c1.3 1.3 3.4.4 3.4-1.4v-.1c0-.5-.2-1-.6-1.4l-6.8-6.8c-.8-.8-2-.8-2.8 0l-6.8 6.8c-.4.4-.6.9-.6 1.4v.1c0 1.8 2.2 2.7 3.4 1.4l3.4-3.4v34c.7 0 1.3.1 2 .1 15.2 0 27.6-12.4 27.6-27.6-.1-16.4-14.2-29.4-30.9-27.5z"
        style={{
            fill: "gray",
        }}
    />
</svg></span>

const isAndroid4 = /Android 4./i.test(navigator.userAgent);

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
    static defaultProps = {
        pullDownText: '下拉刷新',
        pullUpText: '查看更多',
        loadingClassName: '',
        loadIcon: loading,
        pullIcon: arrow, // arrow,
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

    constructor(props: Props) {
        super(props);
        this.state = {
            rootHeight: 0,
            transfrom: 0,
            loadingtext: null,
            showArrow: false,
            showLoading: false,
            arrowRotate: 0,
            errMsg: null,
        };
        // 外框
        this.rootbox = null;
        // 拖拽框
        this.drogbox = null;
        // 滚动框
        this.listwrap = null;
        // 内容框
        this.listcontent = null;
        // 偏移值
        this.offset = 0;
        this.startPos = 0;
        this.endPos = 0;
        this.startXPos = 0;
        this.endXPos = 0;
        this.originTransfrom = 0;
        this.isTouch = false;
        this.isScroll = false;
        this.minDistance = 50;
        this.step = 300;
        this.timererror = undefined;
        this.delaytimer = undefined;
        this.isStatusLoading = false;
        this.distence = 0;
        this.initialDirection = null;
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        this.onRemoveTouchEventListener();
    }

    init = () => {
        setTimeout(() => {
            this.onAddTouchEventListener();
            this.pageHeight = this.rootbox?.parentElement?.clientHeight;
            if (!this.pageHeight) {
                console.warn('rmc-pull-updown-to-refresh:The parent HTML element of the component has no height, please set it, otherwise the component will be set as the window height！')
                this.pageHeight = window.innerHeight;
            }
            this.originTransfrom = this.pageHeight * -1;
            this.setState({
                rootHeight: this.pageHeight,
                transfrom: this.originTransfrom,
            });
        }, 100);
    };

    stateInit = () => {
        this.setState({
            loadingtext: null,
            showLoading: false,
            showArrow: false,
            errMsg: null,
            arrowRotate: 0,
            transfrom: this.originTransfrom,
            debug: null,
        });
        this.offset = 0;
        this.distence = 0;
        this.step = 300;

        window.clearTimeout(this.timererror);
        window.clearTimeout(this.delaytimer);
        this.isStatusLoading = false;
        this.isTouch = false;
    };

    isOnScroll = () => {
        const listwrap = this.listwrap?.offsetHeight || 0;
        const listcontent = this.listcontent?.offsetHeight || 0;
        const { scrollTop = 0 } = this.listwrap || {};
        if (listwrap + scrollTop + 1 >= listcontent || scrollTop === 0) {
            return false;
        }
        if (!this.isScroll) {
            this.stateInit();
        }

        return true;
    };

    onScroll = () => {
        this.isScroll = this.isOnScroll();
    };

    // 不确定reactOnTouch 事件的兼容性
    onAddTouchEventListener = () => {
        if (!this.drogbox || !this.listwrap) return;
        this.drogbox.addEventListener('touchstart', this.onTouchStart, false);
        this.drogbox.addEventListener('touchmove', this.onTouchMove, false);
        this.drogbox.addEventListener('touchend', this.onTouchEnd, false);
        this.listwrap.addEventListener('scroll', this.onScroll, false);
    };

    // 取消EventListener
    onRemoveTouchEventListener = () => {
        if (!this.drogbox || !this.listwrap) return;
        this.drogbox.removeEventListener('touchstart', this.onTouchStart);
        this.drogbox.removeEventListener('touchmove', this.onTouchMove);
        this.drogbox.removeEventListener('touchend', this.onTouchEnd);
        this.listwrap.removeEventListener('scroll', this.onScroll);
    };

    onTouchStart = (event: any) => {
        if (this.isScroll) {
            return;
        }

        if (this.isStatusLoading) {
            return;
        }
        const listwrap = this.listwrap?.offsetHeight || 0;
        const listcontent = this.listcontent?.offsetHeight || 0;
        const { scrollTop = 0 } = this.listwrap || {};
        if (this.isTouch) {
            // hank android4.x touchmove只执行一次，除非在touchstart时使用event.preventDefault();
            // ISSUE:https://issuetracker.google.com/issues/36932783
            if (isAndroid4 && listwrap + scrollTop + 1 >= listcontent) {
                event.preventDefault();
            }
            return;
        }

        this.isTouch = true;

        const e = event.changedTouches[0];
        this.startPos = e.screenY;
        this.startXPos = e.screenX;
        this.initialDirection = null;
    };

    onTouchMove = (event: any) => {
        if (this.isScroll) {
            return;
        }

        if (this.isStatusLoading) {
            return;
        }

        if (!this.isTouch) {
            return;
        }

        const listwrap = this.listwrap?.offsetHeight || 0;
        const listcontent = this.listcontent?.offsetHeight || 0;
        const { scrollTop = 0 } = this.listwrap || {};

        // top
        if (
            this.listwrap?.scrollTop === 0 &&
            this.endPos - this.startPos > 0 &&
            event.cancelable
        ) {
            event.preventDefault();
        }
        // buttom
        if (
            this.listwrap &&
            this.listwrap.scrollTop + this.listwrap.clientHeight ===
            this.listwrap.scrollHeight &&
            this.endPos - this.startPos < 0 &&
            event.cancelable
        ) {
            event.preventDefault();
        }

        const e = event.changedTouches[0];
        this.endPos = e.screenY;
        this.endXPos = e.screenX;

        // x, y, angle 滑动轨迹与X轴角度小于等于60，纵向视滑动为无效
        const rate = slope(
            this.endXPos - this.startXPos,
            this.endPos - this.startPos,
            60
        );

        if (rate < 1) {
            return;
        }

        this.distence = this.endPos - this.startPos;

        if (!this.initialDirection) {
            if (this.distence > 10 && !this.props.disablePullDown) {
                this.initialDirection = 1;
            }
            if (this.distence < -10 && !this.props.disablePullUp) {
                this.initialDirection = -1;
            }
        }

        if (
            this.initialDirection === 1 &&
            this.listwrap?.scrollTop === 0 &&
            this.props.disablePullDown
        ) {
            return;
        }

        if (
            this.initialDirection === -1 &&
            listwrap + scrollTop + 1 >= listcontent &&
            this.props.disablePullUp
        ) {
            return;
        }

        let dist =
            this.endPos - this.startPos < 100
                ? 100
                : this.endPos - this.startPos;

        if (this.endPos < this.startPos) {
            dist *= -1;
        }

        if (
            (this.endPos > this.startPos && this.listwrap?.scrollTop !== 0) ||
            (this.endPos < this.startPos &&
                listwrap + scrollTop + 1 < listcontent)
        ) {
            dist = 0;
        }

        this.offset = (this.step -= 2) / dist;
        if (this.offset === Infinity) {
            this.offset = -1;
        }
        if (
            (this.props.disablePullDown && this.offset > 0) ||
            (this.props.disablePullUp && this.offset < 0)
        ) {
            this.offset = 0;
        }

        let { arrowRotate } = this.state;

        const tranrotte =
            arrowRotate < 180 ? (arrowRotate += 8) : 180;

        let loadingtext = null;
        if (this.initialDirection === 1) {
            loadingtext = this.props.pullDownText;
        }
        if (this.initialDirection === -1) {
            loadingtext = this.props.pullUpText;
        }

        // 方向错误时
        if (
            (this.initialDirection === -1 && this.distence > 0) ||
            (this.initialDirection === 1 && this.distence < 0)
        ) {
            return;
        }
        this.setState({
            errMsg: null,
            transfrom: (this.state.transfrom || 0) + this.offset,
            loadingtext,
            showArrow: true,
            showLoading: false,
            arrowRotate: tranrotte,
        });
    };

    onTouchEnd = (event: any) => {
        if (this.isScroll) {
            return true;
        }

        if (this.isStatusLoading) {
            return true;
        }

        if (!this.isTouch) {
            return true;
        }
        this.isStatusLoading = true;

        const distence = Math.abs(
            Math.abs(this.originTransfrom) - Math.abs(this.state.transfrom || 0)
        );

        const e = event.changedTouches[0];
        this.endPos = e.screenY;
        let transf = null;
        if (distence > this.minDistance) {
            if (this.initialDirection === -1) {
                transf = this.originTransfrom - this.minDistance;
            }
            if (this.initialDirection === 1) {
                transf = this.originTransfrom + this.minDistance;
            }
        } else {
            transf = this.originTransfrom;
        }

        this.setState(
            {
                transfrom: transf,
                loadingtext: '加载中',
                showLoading: true,
                showArrow: false,
                arrowRotate: 0,
            },
            () => {
                this.isTouch = false;
                this.offset = 0;
                this.step = 300;
                this.handleAction(this.initialDirection || 0);
            }
        );
        return true;
    };

    handleAction = (direction: number) => {
        let errortran: number | null = null;
        if (direction === -1) {
            errortran = this.originTransfrom - this.minDistance;
        }
        if (direction === 1) {
            errortran = this.originTransfrom + this.minDistance;
        }
        return Promise.resolve()
            .then(() => {
                if (direction === -1 && !this.props.disablePullUp) {
                    return this.props.onPullUp && this.props.onPullUp();
                }
                if (direction === 1 && !this.props.disablePullDown) {
                    return this.props.onPullDown && this.props.onPullDown();
                }
                return false;
            })
            .then(() => {
                this.setState(
                    {
                        transfrom: this.originTransfrom,
                        loadingtext: null,
                        showLoading: false,
                        showArrow: false,
                    },
                    () => {
                        this.stateInit();
                    }
                );
                return 'RefreshSuccess';
            })
            .catch((error) => {
                this.setState({
                    transfrom: errortran,
                    loadingtext: null,
                    showLoading: false,
                    showArrow: false,
                    errMsg: error,
                });
                window.clearTimeout(this.timererror);
                this.timererror = window.setTimeout(() => {
                    this.setState(
                        {
                            transfrom: this.originTransfrom,
                            errMsg: null,
                        },
                        () => {
                            this.stateInit();
                        }
                    );
                }, 3000);
            });
    };

    render() {
        const {
            debug,
            rootHeight,
            transfrom,
            loadingtext,
            showLoading,
            showArrow,
            arrowRotate,
            errMsg,
        } = this.state;
        const { className } = this.props;
        const drogboxstyle = {
            height: `${rootHeight * 2}px`,
            transform: `matrix(1, 0, 0, 1, 0, ${transfrom})`,
            WebkitTransform: `matrix(1, 0, 0, 1, 0, ${transfrom})`,
        };

        const arrowstyle = {
            transform: `rotate(${arrowRotate}deg)`,
            WebkitTransform: `rotate(${arrowRotate}deg)`,
        };

        const loadingstyle: React.CSSProperties = {
            height: `${rootHeight}px`,
            width: '100%',
            position: 'relative',
        }

        return (
            <div
                ref={(el) => {
                    this.rootbox = el;
                }}
                style={{ height: `${this.pageHeight}px` }}
                className={`${s.rootbox} ${className || ''}`}
            >
                {debug && <div className={s.debug}>{debug}</div>}
                <div
                    ref={(el) => {
                        this.drogbox = el;
                    }}
                    className={s.drogbox}
                    style={drogboxstyle}
                >
                    <div
                        className={`${s.drogbar} ${this.props.loadingClassName}`}
                        style={loadingstyle}
                    >
                        <div className={`${s.top} ${s.loading}`}>
                            {showLoading && this.props.loadIcon}
                            {showArrow && (
                                <span
                                    className={s.arrowico}
                                    style={arrowstyle}
                                >
                                    <div
                                        className={s.arrowup}
                                    >{this.props.pullIcon}</div>
                                </span>
                            )}
                            {loadingtext}
                            {errMsg}
                        </div>
                    </div>
                    <div
                        ref={(el) => {
                            this.listwrap = el;
                        }}
                        className={s.listwrap}
                        style={{ height: `${rootHeight}px` }}
                    >
                        <div
                            ref={(el) => {
                                this.listcontent = el;
                            }}
                        >
                            {this.props.children}
                        </div>
                    </div>
                    <div
                        className={`${s.drogbar} ${this.props.loadingClassName}`}
                        style={loadingstyle}
                    >
                        <div className={s.loading}>
                            {showLoading && this.props.loadIcon}
                            {showArrow && (
                                <span
                                    className={s.arrowico}
                                    style={arrowstyle}
                                >
                                    <span
                                        className={s.arrowbottom}
                                    >{this.props.pullIcon}</span>
                                </span>
                            )}
                            {loadingtext}
                            {errMsg}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
