import React, { Component } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function almostEqual(a, b, epsilon) {
    return Math.abs(a - b) < epsilon;
}
function toRadians(angle) {
    return angle * (Math.PI / 180);
}
function slope(x, y, angle) {
    var left = Math.abs(y) / Math.abs(x);
    var right = Math.tan(toRadians(angle));
    if (almostEqual(left, right, Number.EPSILON)) {
        return 0;
    }
    return left > right ? 1 : -1;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".PullToRefresh_rootbox__Gy9qk {\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n}\n\n.PullToRefresh_drogbox__hntGN {\n  width: 100%;\n  position: absolute;\n  transition-duration: 0s;\n  left: 0;\n}\n\n.PullToRefresh_listwrap__OnOwX {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  position: relative;\n}\n\n.PullToRefresh_listcontent__3FrYw {\n  box-sizing: border-box;\n  width: 100%;\n}\n\n.PullToRefresh_drogbar__baIiv {\n  background-color: #eee;\n  position: relative;\n}\n\n.PullToRefresh_loading__ivKA3 {\n  position: absolute;\n  width: 100%;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: smaller;\n  color: #888;\n}\n\n.PullToRefresh_top__YS33d {\n  bottom: 0;\n}\n\n.PullToRefresh_buttom__K1gr1 {\n  top: 0;\n}\n\n.PullToRefresh_loadingline__4Qp2- {\n  width: 100%;\n  display: flex;\n  height: 20px;\n  align-items: center;\n  font-size: smaller;\n  color: #888;\n  font-size: 10px;\n  line-height: 0;\n  align-items: center;\n  justify-content: center;\n}\n\n.PullToRefresh_arrowico__SaCAe, .PullToRefresh_loadingico__K4szf {\n  height: 1rem;\n  width: 1rem;\n  transform-origin: center;\n}\n.PullToRefresh_arrowico__SaCAe svg, .PullToRefresh_loadingico__K4szf svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.PullToRefresh_error__6QoXX, .PullToRefresh_loadingtext__OtEKs {\n  color: #888;\n}\n\n.PullToRefresh_arrowup__2-Gyh {\n  transform: rotate(180deg);\n  transform-origin: center;\n}\n\n.PullToRefresh_debug__GjXyo {\n  width: 100%;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  color: red;\n  position: absolute;\n}";
var s = {"rootbox":"PullToRefresh_rootbox__Gy9qk","drogbox":"PullToRefresh_drogbox__hntGN","listwrap":"PullToRefresh_listwrap__OnOwX","listcontent":"PullToRefresh_listcontent__3FrYw","drogbar":"PullToRefresh_drogbar__baIiv","loading":"PullToRefresh_loading__ivKA3","top":"PullToRefresh_top__YS33d","buttom":"PullToRefresh_buttom__K1gr1","loadingline":"PullToRefresh_loadingline__4Qp2-","arrowico":"PullToRefresh_arrowico__SaCAe","loadingico":"PullToRefresh_loadingico__K4szf","error":"PullToRefresh_error__6QoXX","loadingtext":"PullToRefresh_loadingtext__OtEKs","arrowup":"PullToRefresh_arrowup__2-Gyh","debug":"PullToRefresh_debug__GjXyo"};
styleInject(css_248z);

var loading = React.createElement("span", { className: s.loadingico },
    React.createElement("svg", { className: "lds-palette-ring", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" },
        React.createElement("g", { transform: "rotate(150 50 50)" },
            React.createElement("path", { d: "M80 50a30 30 0 0 1-20.73 28.532", fill: "none", stroke: "#ffffcb", strokeWidth: 10 }),
            React.createElement("path", { d: "M59.27 78.532a30 30 0 0 1-33.54-10.898", fill: "none", stroke: "#fac090", strokeWidth: 10 }),
            React.createElement("path", { d: "M25.73 67.634a30 30 0 0 1 0-35.268", fill: "none", stroke: "#ff7c81", strokeWidth: 10 }),
            React.createElement("path", { d: "M25.73 32.366a30 30 0 0 1 33.54-10.898", fill: "none", stroke: "#c0f6d2", strokeWidth: 10 }),
            React.createElement("path", { d: "M59.27 21.468A30 30 0 0 1 80 50", fill: "none", stroke: "#dae4bf", strokeWidth: 10 }),
            React.createElement("animateTransform", { attributeName: "transform", type: "rotate", values: "0 50 50;360 50 50", dur: 1, repeatCount: "indefinite" }))));
var arrow = React.createElement("span", { className: s.arrowico },
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-359 361 80 80", xmlSpace: "preserve" },
        React.createElement("path", { d: "M-322.2 373.6c-12.6 1.4-22.7 11.5-24.2 24.1-1.5 12.8 5.7 24.1 16.6 28.8 0-2.5-1.2-4.9-3.2-6.4-6.6-4.9-10.5-13.1-9.3-22.2 1.4-10.6 10.1-19.1 20.7-20.3 14.2-1.6 26.3 9.6 26.3 23.5 0 12.4-9.5 22.5-21.6 23.5v-30l3.4 3.4c1.3 1.3 3.4.4 3.4-1.4v-.1c0-.5-.2-1-.6-1.4l-6.8-6.8c-.8-.8-2-.8-2.8 0l-6.8 6.8c-.4.4-.6.9-.6 1.4v.1c0 1.8 2.2 2.7 3.4 1.4l3.4-3.4v34c.7 0 1.3.1 2 .1 15.2 0 27.6-12.4 27.6-27.6-.1-16.4-14.2-29.4-30.9-27.5z", style: {
                fill: "gray",
            } })));
var isAndroid4 = /Android 4./i.test(navigator.userAgent);
var PullToRefresh = /** @class */ (function (_super) {
    __extends(PullToRefresh, _super);
    function PullToRefresh(props) {
        var _this = _super.call(this, props) || this;
        _this.init = function () {
            setTimeout(function () {
                var _a, _b;
                _this.onAddTouchEventListener();
                _this.pageHeight = (_b = (_a = _this.rootbox) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.clientHeight;
                if (!_this.pageHeight) {
                    console.warn('rmc-pull-updown-to-refresh:The parent HTML element of the component has no height, please set it, otherwise the component will be set as the window height！');
                    _this.pageHeight = window.innerHeight;
                }
                _this.originTransfrom = _this.pageHeight * -1;
                _this.setState({
                    rootHeight: _this.pageHeight,
                    transfrom: _this.originTransfrom,
                });
            }, 100);
        };
        _this.stateInit = function () {
            _this.setState({
                loadingtext: null,
                showLoading: false,
                showArrow: false,
                errMsg: null,
                arrowRotate: 0,
                transfrom: _this.originTransfrom,
                debug: null,
            });
            _this.offset = 0;
            _this.distence = 0;
            _this.step = 300;
            window.clearTimeout(_this.timererror);
            window.clearTimeout(_this.delaytimer);
            _this.isStatusLoading = false;
            _this.isTouch = false;
        };
        _this.isOnScroll = function () {
            var _a, _b;
            var listwrap = ((_a = _this.listwrap) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
            var listcontent = ((_b = _this.listcontent) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
            var _c = (_this.listwrap || {}).scrollTop, scrollTop = _c === void 0 ? 0 : _c;
            if (listwrap + scrollTop + 1 >= listcontent || scrollTop === 0) {
                return false;
            }
            if (!_this.isScroll) {
                _this.stateInit();
            }
            return true;
        };
        _this.onScroll = function () {
            _this.isScroll = _this.isOnScroll();
        };
        // 不确定reactOnTouch 事件的兼容性
        _this.onAddTouchEventListener = function () {
            if (!_this.drogbox || !_this.listwrap)
                return;
            _this.drogbox.addEventListener('touchstart', _this.onTouchStart, false);
            _this.drogbox.addEventListener('touchmove', _this.onTouchMove, false);
            _this.drogbox.addEventListener('touchend', _this.onTouchEnd, false);
            _this.listwrap.addEventListener('scroll', _this.onScroll, false);
        };
        // 取消EventListener
        _this.onRemoveTouchEventListener = function () {
            if (!_this.drogbox || !_this.listwrap)
                return;
            _this.drogbox.removeEventListener('touchstart', _this.onTouchStart);
            _this.drogbox.removeEventListener('touchmove', _this.onTouchMove);
            _this.drogbox.removeEventListener('touchend', _this.onTouchEnd);
            _this.listwrap.removeEventListener('scroll', _this.onScroll);
        };
        _this.onTouchStart = function (event) {
            var _a, _b;
            if (_this.isScroll) {
                return;
            }
            if (_this.isStatusLoading) {
                return;
            }
            var listwrap = ((_a = _this.listwrap) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
            var listcontent = ((_b = _this.listcontent) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
            var _c = (_this.listwrap || {}).scrollTop, scrollTop = _c === void 0 ? 0 : _c;
            if (_this.isTouch) {
                // hank android4.x touchmove只执行一次，除非在touchstart时使用event.preventDefault();
                // ISSUE:https://issuetracker.google.com/issues/36932783
                if (isAndroid4 && listwrap + scrollTop + 1 >= listcontent) {
                    event.preventDefault();
                }
                return;
            }
            _this.isTouch = true;
            var e = event.changedTouches[0];
            _this.startPos = e.screenY;
            _this.startXPos = e.screenX;
            _this.initialDirection = null;
        };
        _this.onTouchMove = function (event) {
            var _a, _b, _c, _d, _e;
            if (_this.isScroll) {
                return;
            }
            if (_this.isStatusLoading) {
                return;
            }
            if (!_this.isTouch) {
                return;
            }
            var listwrap = ((_a = _this.listwrap) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
            var listcontent = ((_b = _this.listcontent) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
            var _f = (_this.listwrap || {}).scrollTop, scrollTop = _f === void 0 ? 0 : _f;
            // top
            if (((_c = _this.listwrap) === null || _c === void 0 ? void 0 : _c.scrollTop) === 0 &&
                _this.endPos - _this.startPos > 0 &&
                event.cancelable) {
                event.preventDefault();
            }
            // buttom
            if (_this.listwrap &&
                _this.listwrap.scrollTop + _this.listwrap.clientHeight ===
                    _this.listwrap.scrollHeight &&
                _this.endPos - _this.startPos < 0 &&
                event.cancelable) {
                event.preventDefault();
            }
            var e = event.changedTouches[0];
            _this.endPos = e.screenY;
            _this.endXPos = e.screenX;
            // x, y, angle 滑动轨迹与X轴角度小于等于60，纵向视滑动为无效
            var rate = slope(_this.endXPos - _this.startXPos, _this.endPos - _this.startPos, 60);
            if (rate < 1) {
                return;
            }
            _this.distence = _this.endPos - _this.startPos;
            if (!_this.initialDirection) {
                if (_this.distence > 10 && !_this.props.disablePullDown) {
                    _this.initialDirection = 1;
                }
                if (_this.distence < -10 && !_this.props.disablePullUp) {
                    _this.initialDirection = -1;
                }
            }
            if (_this.initialDirection === 1 &&
                ((_d = _this.listwrap) === null || _d === void 0 ? void 0 : _d.scrollTop) === 0 &&
                _this.props.disablePullDown) {
                return;
            }
            if (_this.initialDirection === -1 &&
                listwrap + scrollTop + 1 >= listcontent &&
                _this.props.disablePullUp) {
                return;
            }
            var dist = _this.endPos - _this.startPos < 100
                ? 100
                : _this.endPos - _this.startPos;
            if (_this.endPos < _this.startPos) {
                dist *= -1;
            }
            if ((_this.endPos > _this.startPos && ((_e = _this.listwrap) === null || _e === void 0 ? void 0 : _e.scrollTop) !== 0) ||
                (_this.endPos < _this.startPos &&
                    listwrap + scrollTop + 1 < listcontent)) {
                dist = 0;
            }
            _this.offset = (_this.step -= 2) / dist;
            if (_this.offset === Infinity) {
                _this.offset = -1;
            }
            if ((_this.props.disablePullDown && _this.offset > 0) ||
                (_this.props.disablePullUp && _this.offset < 0)) {
                _this.offset = 0;
            }
            var arrowRotate = _this.state.arrowRotate;
            var tranrotte = arrowRotate < 180 ? (arrowRotate += 8) : 180;
            var loadingtext = null;
            if (_this.initialDirection === 1) {
                loadingtext = _this.props.pullDownText;
            }
            if (_this.initialDirection === -1) {
                loadingtext = _this.props.pullUpText;
            }
            // 方向错误时
            if ((_this.initialDirection === -1 && _this.distence > 0) ||
                (_this.initialDirection === 1 && _this.distence < 0)) {
                return;
            }
            _this.setState({
                errMsg: null,
                transfrom: (_this.state.transfrom || 0) + _this.offset,
                loadingtext: loadingtext,
                showArrow: true,
                showLoading: false,
                arrowRotate: tranrotte,
            });
        };
        _this.onTouchEnd = function (event) {
            if (_this.isScroll) {
                return true;
            }
            if (_this.isStatusLoading) {
                return true;
            }
            if (!_this.isTouch) {
                return true;
            }
            _this.isStatusLoading = true;
            var distence = Math.abs(Math.abs(_this.originTransfrom) - Math.abs(_this.state.transfrom || 0));
            var e = event.changedTouches[0];
            _this.endPos = e.screenY;
            var transf = null;
            if (distence > _this.minDistance) {
                if (_this.initialDirection === -1) {
                    transf = _this.originTransfrom - _this.minDistance;
                }
                if (_this.initialDirection === 1) {
                    transf = _this.originTransfrom + _this.minDistance;
                }
            }
            else {
                transf = _this.originTransfrom;
            }
            _this.setState({
                transfrom: transf,
                loadingtext: '加载中',
                showLoading: true,
                showArrow: false,
                arrowRotate: 0,
            }, function () {
                _this.isTouch = false;
                _this.offset = 0;
                _this.step = 300;
                _this.handleAction(_this.initialDirection || 0);
            });
            return true;
        };
        _this.handleAction = function (direction) {
            var errortran = null;
            if (direction === -1) {
                errortran = _this.originTransfrom - _this.minDistance;
            }
            if (direction === 1) {
                errortran = _this.originTransfrom + _this.minDistance;
            }
            return Promise.resolve()
                .then(function () {
                if (direction === -1 && !_this.props.disablePullUp) {
                    return _this.props.onPullUp && _this.props.onPullUp();
                }
                if (direction === 1 && !_this.props.disablePullDown) {
                    return _this.props.onPullDown && _this.props.onPullDown();
                }
                return false;
            })
                .then(function () {
                _this.setState({
                    transfrom: _this.originTransfrom,
                    loadingtext: null,
                    showLoading: false,
                    showArrow: false,
                }, function () {
                    _this.stateInit();
                });
                return 'RefreshSuccess';
            })
                .catch(function (error) {
                _this.setState({
                    transfrom: errortran,
                    loadingtext: null,
                    showLoading: false,
                    showArrow: false,
                    errMsg: error,
                });
                window.clearTimeout(_this.timererror);
                _this.timererror = window.setTimeout(function () {
                    _this.setState({
                        transfrom: _this.originTransfrom,
                        errMsg: null,
                    }, function () {
                        _this.stateInit();
                    });
                }, 3000);
            });
        };
        _this.state = {
            rootHeight: 0,
            transfrom: 0,
            loadingtext: null,
            showArrow: false,
            showLoading: false,
            arrowRotate: 0,
            errMsg: null,
        };
        // 外框
        _this.rootbox = null;
        // 拖拽框
        _this.drogbox = null;
        // 滚动框
        _this.listwrap = null;
        // 内容框
        _this.listcontent = null;
        // 偏移值
        _this.offset = 0;
        _this.startPos = 0;
        _this.endPos = 0;
        _this.startXPos = 0;
        _this.endXPos = 0;
        _this.originTransfrom = 0;
        _this.isTouch = false;
        _this.isScroll = false;
        _this.minDistance = 50;
        _this.step = 300;
        _this.timererror = undefined;
        _this.delaytimer = undefined;
        _this.isStatusLoading = false;
        _this.distence = 0;
        _this.initialDirection = null;
        return _this;
    }
    PullToRefresh.prototype.componentDidMount = function () {
        this.init();
    };
    PullToRefresh.prototype.componentWillUnmount = function () {
        this.onRemoveTouchEventListener();
    };
    PullToRefresh.prototype.render = function () {
        var _this = this;
        var _a = this.state, debug = _a.debug, rootHeight = _a.rootHeight, transfrom = _a.transfrom, loadingtext = _a.loadingtext, showLoading = _a.showLoading, showArrow = _a.showArrow, arrowRotate = _a.arrowRotate, errMsg = _a.errMsg;
        var className = this.props.className;
        var drogboxstyle = {
            height: "".concat(rootHeight * 2, "px"),
            transform: "matrix(1, 0, 0, 1, 0, ".concat(transfrom, ")"),
            WebkitTransform: "matrix(1, 0, 0, 1, 0, ".concat(transfrom, ")"),
        };
        var arrowstyle = {
            transform: "rotate(".concat(arrowRotate, "deg)"),
            WebkitTransform: "rotate(".concat(arrowRotate, "deg)"),
        };
        var loadingstyle = {
            height: "".concat(rootHeight, "px"),
            width: '100%',
            position: 'relative',
        };
        return (React.createElement("div", { ref: function (el) {
                _this.rootbox = el;
            }, style: { height: "".concat(this.pageHeight, "px") }, className: "".concat(s.rootbox, " ").concat(className || '') },
            debug && React.createElement("div", { className: s.debug }, debug),
            React.createElement("div", { ref: function (el) {
                    _this.drogbox = el;
                }, className: s.drogbox, style: drogboxstyle },
                React.createElement("div", { className: "".concat(s.drogbar, " ").concat(this.props.loadingClassName), style: loadingstyle },
                    React.createElement("div", { className: "".concat(s.top, " ").concat(s.loading) },
                        showLoading && this.props.loadIcon,
                        showArrow && (React.createElement("span", { className: s.arrowico, style: arrowstyle },
                            React.createElement("div", { className: s.arrowup }, this.props.pullIcon))),
                        loadingtext,
                        errMsg)),
                React.createElement("div", { ref: function (el) {
                        _this.listwrap = el;
                    }, className: s.listwrap, style: { height: "".concat(rootHeight, "px") } },
                    React.createElement("div", { ref: function (el) {
                            _this.listcontent = el;
                        } }, this.props.children)),
                React.createElement("div", { className: "".concat(s.drogbar, " ").concat(this.props.loadingClassName), style: loadingstyle },
                    React.createElement("div", { className: s.loading },
                        showLoading && this.props.loadIcon,
                        showArrow && (React.createElement("span", { className: s.arrowico, style: arrowstyle },
                            React.createElement("span", { className: s.arrowbottom }, this.props.pullIcon))),
                        loadingtext,
                        errMsg)))));
    };
    PullToRefresh.defaultProps = {
        pullDownText: '下拉刷新',
        pullUpText: '查看更多',
        loadingClassName: '',
        loadIcon: loading,
        pullIcon: arrow, // arrow,
    };
    return PullToRefresh;
}(Component));

export { PullToRefresh as default };
//# sourceMappingURL=index.esm.js.map
