import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import Router from './router/Routers'
import './styles/global.scss'
import './styles/fonts.css'
import {loadUser} from "./redux/actions/auth";

const store = createStore(rootReducer, compose(
	applyMiddleware(
		thunk
	)
));


class App extends React.Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<BrowserRouter>
				<Provider store={store}>
					<Router/>
				</Provider>
			</BrowserRouter>
		);
	}
}

export default App
