import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './i18n/I18nInit';

import App from './App';
import './index.scss';

const mountNode = document.getElementById('popup');
ReactDOM.render(<App />, mountNode);
