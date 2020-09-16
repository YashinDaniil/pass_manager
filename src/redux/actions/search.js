import {
	SEARCH_START,
	SEARCH_CLEAR,
	SEARCH_EDIT,
	SEARCH_EDIT_TYPE
} from '../actions/types';

export const startSearch = (searchType) => (dispatch) => {
	dispatch({
		type: SEARCH_START,
		payload: searchType,
	});
};

export const clearSearch = () => (dispatch) => {
	dispatch({
		type: SEARCH_CLEAR,
	});
};

export const editField = (value) => (dispatch) => {
	dispatch({
		type: SEARCH_EDIT,
		payload: value
	});
};

export const editType = (type) => (dispatch) => {
	dispatch({
		type: SEARCH_EDIT_TYPE,
		payload: type
	});
};