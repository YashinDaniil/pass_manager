import React from 'react';
import {connect} from "react-redux";
import Navigation from "./Navigation";
import Search from "./Search";
import Header from "./Header";
import DashboardSidebar from "./Sidebar";
import PasswordComponent from "./Password/PasswordComponent";
import ValidMasterModal from "./ValidMasterModal";
import {Redirect} from 'react-router-dom';


class Dashboard extends React.Component {
	state = {
		nav: 0,
		theme: false
	};

	render() {
		let content = '';
		switch (this.state.nav) {
			case 0:
				content = (<PasswordComponent/>);
				break;
			default:
				content = '';
		}
		document.querySelector('body').className = (this.props.theme === 'light') ? 'light' : 'dark';
		return (
			<div className='container-fluid'>
				<DashboardSidebar>
					<Header/>
					<ValidMasterModal/>
					<div className='row'>
						<div className='col-1'>
							<Navigation nav={this.state.nav}/>
						</div>
						<div className='dashboard-block container ml-0'>
							<Search/>
							<div className='dashboard-block-content'>
								{content}
							</div>
						</div>
					</div>
				</DashboardSidebar>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	theme: state.auth.user.theme
});

export default connect(mapStateToProps, null)(Dashboard)