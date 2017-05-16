// import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';

// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';

import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import App from './modules/App';

import './stylesheets/main.scss';

// const middlewares = [thunkMiddleware];
// let composeEnhancers = compose;
// if (process.env.NODE_ENV === 'development') {
// 	const loggerMiddleware = createLogger();
// 	middlewares.push(loggerMiddleware);
// 	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }

// const store = createStore(
// 	composeEnhancers(
// 		applyMiddleware(...middlewares)
// 	)
// );

// render((
// 	<Provider store={store}>
// 		<Router history={browserHistory}>
// 			<Route
// 				path="/"
// 				component={App}
// 			>
// 			</Route>
// 		</Router>
// 	</Provider>
// ), document.getElementById('content'));

render(<App />, document.getElementById('content'))