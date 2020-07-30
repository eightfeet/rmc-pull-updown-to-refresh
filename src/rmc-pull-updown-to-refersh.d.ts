declare module 'rmc-pull-updown-to-refresh' {
  import React from 'react';

  type PullToRefresh = React.ComponentType<{
    /**
     * 禁止向下拉
     */
    disablePullDown?: boolean;
    /**
     * 禁止向上拉
     */
    disablePullUp?: boolean;
    /**
     * 下拉loading状态文案
     */
    pullDownText?: string;
    /**
     * 上拉loading状态文案
     */
    pullUpText?: string;
    /**
     * 下拉loading状态背景
     */
    loadBackground?: string;
    /**
     * 下拉loading状态文字颜色
     */
    loadTextColor?: string;
    /**
     * 上拉事件
     */
    onPullUp?: () => Promise<any>;
    /**
     * 下拉事件
     */
    onPullDown?: () => Promise<any>;
    /**
     * loading 图标
     */
    loadIcon?: string;
    /**
     * 下拉箭头 图标
     */
    pullIcon?: string;
    className?: string;
    children?: any;
    [keys: string]: any;
  }>;

  export default PullToRefresh;
}
