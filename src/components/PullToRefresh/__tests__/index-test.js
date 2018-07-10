/* eslint-env jest */
import PullToRefresh from './../../../index';
import PullToRefreshComponent from './../PullToRefresh';

describe('index.js', () => {
  it('should correctly export component as named export', () => {
    expect(PullToRefresh).toEqual(PullToRefreshComponent);
  });
});
