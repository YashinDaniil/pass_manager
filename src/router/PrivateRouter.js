import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, Link, withRouter, Router} from 'react-router-dom';


const PrivateRoute = ({component: Component, auth, ...rest}) => (
	<Route
		{...rest}
		render={(props) => {
			if (auth.isAuthenticated === true && auth.isLoading === false) {
				return <Component {...props} />;
			} else if (auth.isLoading){
				return <div></div>;
			} else if(auth.isAuthenticated === false && auth.isLoading === false) {
				return <Redirect to={'/'}/>
			}
		}}
	/>
);

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute)



