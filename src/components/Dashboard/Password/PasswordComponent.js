import React from 'react'
import {connect} from "react-redux";
import PasswordItem from "./PasswordItem";
import '../../../styles/passwordContent.scss'
import {getPasswords} from "../../../redux/actions/passwords";

class PasswordComponent extends React.Component {
	componentDidMount() {
		this.props.getPasswords()
	}

	render() {
		let passList = '';
		if (this.props.searchType === 'password') {
			passList = this.props.passList
				.filter(passItem => !passItem.name.indexOf(this.props.searchSortData))
				.map((passItem) =>
					<PasswordItem
						key={passItem.id}
						id={passItem.id}
						url={passItem.url}
						name={passItem.name}
						category={passItem.category}
						username={passItem.username}
						password={passItem.password}
					/>
				)
		} else {
			passList = this.props.passList.map((passItem) =>
				<PasswordItem
					key={passItem.id}
					id={passItem.id}
					url={passItem.url}
					name={passItem.name}
					category={passItem.category}
					username={passItem.username}
					password={passItem.password}
				/>
			)
		}

		return (
			<div className='row ml-0 mr-0'>
				{passList}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	passList: state.passwords.passList,
	searchType: state.search.searchType,
	searchSortData: state.search.searchSortData,
});

export default connect(mapStateToProps, {getPasswords})(PasswordComponent)
