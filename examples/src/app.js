import React from 'react';
import ReactDOM from 'react-dom';
import Example from './components/Example';
import s from './scss.scss';

ReactDOM.render(
  <div className={s.example}>
    <Example />
  </div>,
  document.getElementById('example'),
);
