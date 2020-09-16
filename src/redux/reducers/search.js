import {
	SEARCH_START,
	SEARCH_CLEAR,
	SEARCH_EDIT,
	SEARCH_EDIT_TYPE
} from '../actions/types';
import React from "react";

const initialState = {
		searchField: '',
		searchType: '',
		searchSortData: '',
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SEARCH_START:
			return {
				...state,
				searchType: action.payload,
				searchSortData: state.searchField
			};
		case SEARCH_CLEAR:
			return {
				...state,
				searchField: state.searchField,
				searchType: action.payload.searchType,
			};
		case SEARCH_EDIT:
			return {
				...state,
				searchField: action.payload
			};
		case SEARCH_EDIT_TYPE:
			return {
				...state,
				searchType: action.payload
			};
		default:
			return state;
	}
}