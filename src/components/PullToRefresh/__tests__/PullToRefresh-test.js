/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import PullToRefresh from './../PullToRefresh';

describe('PullToRefresh component', () => {
  it('test', () => {
    const wrapper = shallow(<PullToRefresh />);
    const PullToRefreshState = wrapper.state().rootHeight;
    expect(PullToRefreshState).toEqual(0);
  });
});
