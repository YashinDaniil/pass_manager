import React from 'react';
import {connect} from "react-redux";
import Navigation from "./Navigation";
import Search from "./Search";
import Header from "./Header";
import DashboardSidebar from "./Sidebar";
import PasswordComponent from "./Password/PasswordComponent";
import CardComponent from './Cards/CardComponent'
import ValidMasterModal from "./ValidMasterModal";


class Dashboard extends React.Component {
	state = {
		theme: false
	};

	render() {
		let content = '';
		switch (this.props.navigation) {
			case 0:
				content = (<PasswordComponent/>);
				break;
			case 3:
				content = (<CardComponent/>);
				break
			default:
				content = '';
		}
		document.querySelector('body').className = (this.props.theme === 'light') ? 'light' : 'dark';
		return (
			<div className='container-fluid'>
				<DashboardSidebar>
					<Header/>
					<ValidMasterModal/>
					<div className='row mr-0'>
						<div className='col-1'>
							<Navigation/>
						</div>
						<div className='dashboard-block container offset-1 col-11 ml-0'>
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
	theme: state.auth.user.theme,
	navigation: state.navigation.navState
});

export default connect(mapStateToProps, null)(Dashboard)