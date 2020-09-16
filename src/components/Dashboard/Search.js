import React from 'react';
import {connect} from "react-redux";
import {sidebarOpen} from "../../redux/actions/sidebar";
import {clearSearch, editField, editType, startSearch} from "../../redux/actions/search";


class Search extends React.Component{
	render() {
		return(
			<div className='row'>
				<input className='input-filed dashboard-search inner-shadows mr-auto' name='searchField' type="text" value={this.props.searchField} onChange={(e) => this.props.editField(e.target.value)}/>
				<button className='button search mr-auto' onClick={() => this.props.startSearch('password')}>Search</button>
				<button onClick={() => this.props.sidebarOpen({isOpen: true})} className='button add mr-20'>Add+</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	searchField: state.search.searchField,
	searchType: state.search.searchType,
	itemsList: state.search.itemsList
});

export default connect(mapStateToProps, {sidebarOpen, startSearch, clearSearch, editField, editType})(Search)