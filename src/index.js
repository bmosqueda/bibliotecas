import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

import SearchForm from './SearchForm.jsx';
ReactDOM.render(<SearchForm />, document.getElementById('root'));
registerServiceWorker();