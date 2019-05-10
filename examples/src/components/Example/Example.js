// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PullToRefresh from '../../../../src/components/PullToRefresh';
import s from './Example.scss';
import rocket from './../PullToRefresh/rocket.png';
import loadheart from './../PullToRefresh/loadingheart.svg';

const defaultPage = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let page = 1;

export default class Example extends Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isOpen: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      listleft: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
      <div className={`${s.rootbox}`}>
        <div className={s.clearfix} style={{height: '100%'}}>
          <div className={s.left}>
            <div className={s.pullbox}>
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
                <div>
                  {this.state.listleft.map((item, index) => (
                    <div
                      key={`left${index.toString()}`}
                      className={s.item}
                      onClick={this.onClickItem(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </PullToRefresh>
            </div>
          </div>
          <div className={s.left}>
            <PullToRefresh
              onPullUp={this.onPullUpRight}
              disablePullUp={false}
              disablePullDown
              className={s.bg_green}
            >
              <div>
                {this.state.list.map((item, index) => (
                  <div
                    key={`right${index.toString()}`}
                    className={s.item}
                    onClick={this.onClickItem(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </PullToRefresh>
          </div>
        </div>
      </div>
    );
  }
}
