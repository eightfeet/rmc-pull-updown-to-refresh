import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { slope } from './helper';
import s from './PullToRefresh.scss';
import loading from './loading.svg';
import arrow from './arrow.svg';

const isAndroid4 = /Android 4./i.test(navigator.userAgent);

export default class PullToRefresh extends Component {
  static defaultProps = {
    pullDownText: '下拉刷新',
    pullUpText: '查看更多',
    loadBackground: '#eee',
    loadTextColor: '#888',
    loadIcon: loading,
    pullIcon: arrow, // arrow,
  };

  static propTypes = {
    disablePullDown: PropTypes.bool,
    disablePullUp: PropTypes.bool,
    pullDownText: PropTypes.string,
    pullUpText: PropTypes.string,
    onPullUp: PropTypes.func.isRequired,
    onPullDown: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    loadBackground: PropTypes.string,
    loadTextColor: PropTypes.string,
    loadIcon: PropTypes.string,
    pullIcon: PropTypes.string,
  };

  constructor(props) {
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
    this.originTransfrom = null;
    this.isTouch = false;
    this.isScroll = false;
    this.minDistance = 50;
    this.step = 300;
    this.timererror = null;
    this.delaytimer = null;
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
      this.originTransfrom = this.rootbox.clientHeight * -1;
      this.setState({
        rootHeight: this.rootbox.clientHeight,
        transfrom: this.originTransfrom,
      });
    }, 10);
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
    const listwrap = this.listwrap.offsetHeight;
    const listcontent = this.listcontent.offsetHeight;
    const { scrollTop } = this.listwrap;
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
    this.drogbox.addEventListener('touchstart', this.onTouchStart, false);
    this.drogbox.addEventListener('touchmove', this.onTouchMove, false);
    this.drogbox.addEventListener('touchend', this.onTouchEnd, false);
    this.listwrap.addEventListener('scroll', this.onScroll, false);
  };

  // 取消EventListener
  onRemoveTouchEventListener = () => {
    this.drogbox.removeEventListener('touchstart', this.onTouchStart);
    this.drogbox.removeEventListener('touchmove', this.onTouchMove);
    this.drogbox.removeEventListener('touchend', this.onTouchEnd);
    this.listwrap.removeEventListener('scroll', this.onScroll);
  };

  onTouchStart = event => {
    if (this.isScroll) {
      return;
    }

    if (this.isStatusLoading) {
      return;
    }
    const listwrap = this.listwrap.offsetHeight;
    const listcontent = this.listcontent.offsetHeight;
    const { scrollTop } = this.listwrap;
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

  onTouchMove = event => {
    if (this.isScroll) {
      return;
    }

    if (this.isStatusLoading) {
      return;
    }

    if (!this.isTouch) {
      return;
    }

    const listwrap = this.listwrap.offsetHeight;
    const listcontent = this.listcontent.offsetHeight;
    const { scrollTop } = this.listwrap;

    if (this.listwrap.scrollTop === 0 && this.props.disablePullDown) {
      return;
    }

    if (listwrap + scrollTop + 1 >= listcontent && this.props.disablePullUp) {
      return;
    }

    // top
    if (
      this.listwrap.scrollTop === 0 &&
      this.endPos - this.startPos > 0 &&
      event.cancelable
    ) {
      event.preventDefault();
    }
    // buttom
    if (
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
      60,
    );

    if (rate < 1) {
      return;
    }

    this.distence = this.endPos - this.startPos;

    if (!this.initialDirection) {
      if (this.distence > 10) {
        this.initialDirection = 1;
      }
      if (this.distence < -10) {
        this.initialDirection = -1;
      }
    }

    let dist =
      this.endPos - this.startPos < 100 ? 100 : this.endPos - this.startPos;

    if (this.endPos < this.startPos) {
      dist *= -1;
    }

    if (
      (this.endPos > this.startPos && this.listwrap.scrollTop !== 0) ||
      (this.endPos < this.startPos && listwrap + scrollTop + 1 < listcontent)
    ) {
      dist = 0;
    }

    this.offset = (this.step -= 2) / dist;
    if (this.offset === Infinity) {
      this.offset = -1;
    }

    const tranrotte =
      this.state.arrowRotate < 180 ? (this.state.arrowRotate += 8) : 180;

    let loadingtext = null;
    if (this.initialDirection === 1) {
      loadingtext = this.props.pullDownText;
    }
    if (this.initialDirection === -1) {
      loadingtext = this.props.pullUpText;
    }

    this.setState({
      errMsg: null,
      transfrom: this.state.transfrom + this.offset,
      loadingtext,
      showArrow: true,
      showLoading: false,
      arrowRotate: tranrotte,
    });
  };

  onTouchEnd = event => {
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
      Math.abs(this.originTransfrom) - Math.abs(this.state.transfrom),
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
        this.handleAction(this.initialDirection);
      },
    );
    return true;
  };

  handleAction = direction => {
    let errortran = null;
    if (direction === -1) {
      errortran = this.originTransfrom - this.minDistance;
    }
    if (direction === 1) {
      errortran = this.originTransfrom + this.minDistance;
    }
    return Promise.resolve()
      .then(() => {
        if (direction === -1) {
          return this.props.onPullUp();
        }
        if (direction === 1) {
          return this.props.onPullDown();
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
          },
        );
        return 'RefreshSuccess';
      })
      .catch(error => {
        this.setState({
          transfrom: errortran,
          loadingtext: null,
          showLoading: false,
          showArrow: false,
          errMsg: error,
        });
        window.clearTimeout(this.timererror);
        this.timererror = setTimeout(() => {
          this.setState(
            {
              transfrom: this.originTransfrom,
              errMsg: null,
            },
            () => {
              this.stateInit();
            },
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

    const arrowIcon = {
      backgroundImage: `url(${this.props.pullIcon})`,
    };

    return (
      <div
        ref={el => {
          this.rootbox = el;
        }}
        className={`${s.rootbox} ${className}`}
      >
        {debug && <div className={s.debug}>{debug}</div>}
        <div
          ref={el => {
            this.drogbox = el;
          }}
          className={s.drogbox}
          style={drogboxstyle}
        >
          <div
            className={`${s.drogbar}`}
            style={{
              height: `${rootHeight}px`,
              background: this.props.loadBackground,
            }}
          >
            {loadingtext && (
              <div className={`${s.top} ${s.loading}`}>
                <div className={s.loadingline}>
                  {showLoading && (
                    <span
                      className={s.loadingico}
                      style={{
                        backgroundImage: `url(${this.props.loadIcon})`,
                      }}
                    />
                  )}
                  {showArrow && (
                    <span className={s.arrowico} style={arrowstyle}>
                      <span className={s.arrowup} style={arrowIcon} />
                    </span>
                  )}
                </div>
                <div
                  className={s.loadingtext}
                  style={{
                    color: this.props.loadTextColor,
                  }}
                >
                  {loadingtext}
                </div>
              </div>
            )}
            {errMsg && (
              <div
                className={`${s.top} 
                ${s.loading}`}
              >
                <div
                  className={s.error}
                  style={{
                    color: this.props.loadTextColor,
                  }}
                >
                  {errMsg}
                </div>
              </div>
            )}
          </div>
          <div
            ref={el => {
              this.listwrap = el;
            }}
            className={s.listwrap}
            style={{ height: `${rootHeight}px` }}
          >
            <div
              ref={el => {
                this.listcontent = el;
              }}
              className={s.bs}
            >
              {this.props.children}
            </div>
          </div>
          <div
            className={`${s.drogbar}`}
            style={{
              height: `${rootHeight}px`,
              background: this.props.loadBackground,
              color: this.props.loadTextColor,
            }}
          >
            {loadingtext && (
              <div className={`${s.bottom} ${s.loading}`}>
                <div className={s.loadingline}>
                  {showLoading && (
                    <span
                      className={s.loadingico}
                      style={{
                        backgroundImage: `url(${this.props.loadIcon})`,
                      }}
                    />
                  )}
                  {showArrow && (
                    <span className={s.arrowico} style={arrowstyle}>
                      <span className={s.arrowbottom} style={arrowIcon} />
                    </span>
                  )}
                </div>
                <div
                  className={s.loadingtext}
                  style={{
                    color: this.props.loadTextColor,
                  }}
                >
                  {loadingtext}
                </div>
              </div>
            )}
            {errMsg && (
              <div className={`${s.bottom} ${s.loading}`}>
                <div className={s.error}>{errMsg}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
