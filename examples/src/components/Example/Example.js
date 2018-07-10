// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PullToRefresh from './../PullToRefresh';
import s from './Example.scss';

const defaultPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let page = 1;

export default class Example extends Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      list: defaultPage,
      listleft: defaultPage,
    };
    this.time1 = null;
    this.time2 = null;
    this.time3 = null;
    this.time4 = null;
  }

  onClickItem = item => () => {
    window.alert(item);
  };

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

  onPullDownRight = () =>
    new Promise(res => {
      window.clearTimeout(this.time3);
      this.time3 = setTimeout(() => {
        this.setState(
          {
            list: defaultPage,
          },
          () => res(),
        );
      }, 3000);
    });

  onPullUpRight = () =>
    new Promise(res => {
      window.clearTimeout(this.time4);
      this.time4 = setTimeout(() => {
        this.setState(
          {
            list: [...this.state.list, `page${(page += 1)}`, ...defaultPage],
          },
          () => res(),
        );
      }, 3000);
    });

  render() {
    return (
      <div className={s.rootbox}>
        <PullToRefresh
          className="bg-gray-lightest"
          onPullDown={this.onPullDown}
          disablePullUp={false}
          disablePullDown={false}
          pullDownText="左下拉更新"
          pullUpText="左上拉更新"
          onPullUp={this.onPullUp}
        >
          <div>
            {this.state.listleft.map((item, index) => (
              <div
                className={`${s.item} ${s.bg_orange}`}
                key={`${item}${index.toString()}`}
              >
                {item}
              </div>
            ))}
          </div>
        </PullToRefresh>
      </div>
    );
  }
}
