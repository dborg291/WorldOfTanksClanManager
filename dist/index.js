import * as React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(App, null),
    React.createElement("a", null, "Hello")), document.getElementById('root'));
serviceWorker.unregister();
//# sourceMappingURL=index.js.map