import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as   Switch, Route} from 'react-router-dom';
//import Welcome from "../components/auth/Welcome";
//import RegistrationFull from '../components/auth/RegistrationFull'

import Login from "../components/Auth/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRouter";

const Router = () => {
	return (
		//<Route exact path="/" component={Welcome}/>
		//<PrivateRoute exact path="/registration" component={RegistrationFull}/>
		<Switch>
			<Route exact path='/' component={Login} />
			<PrivateRoute exact path='/dashboard' component={Dashboard} />
		</Switch>
	)
};


export default connect(null, null)(Router)
